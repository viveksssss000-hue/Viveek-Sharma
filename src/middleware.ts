import { NextResponse, type NextRequest } from "next/server";

/**
 * Password protection for the staging deployment.
 *
 * WHY THIS EXISTS RATHER THAN VERCEL'S OWN FEATURE
 * Vercel's Password Protection is a Pro-plan feature. Its free equivalent,
 * Vercel Authentication, only admits members of the Vercel team - which is no
 * use when the whole point of a staging URL here is to send it to a lawyer and
 * a US CPA for review. This is twenty lines, works on any plan, and produces a
 * link that anyone with the password can open.
 *
 * HOW IT BEHAVES
 * Inert unless STAGING_PASSWORD is set. That is deliberate and it is the safety
 * property that matters: production simply does not set it, so this can never
 * accidentally lock the live site behind a password nobody knows. Setting the
 * variable on a deployment protects it; removing it opens it.
 *
 * Pair it with NEXT_PUBLIC_STAGING=true, which makes robots.txt disallow
 * everything, so a staging URL is both unreadable and uncrawlable.
 *
 * This is HTTP Basic authentication, so it is only as private as the connection
 * it travels over. That is fine here because Vercel is HTTPS-only, but it is not
 * a substitute for real authentication and it does not protect anything
 * sensitive - it keeps an unfinished site away from the public and from search
 * engines, and nothing more.
 */

/**
 * Keeps every deployment except the real domain out of the search index.
 *
 * Vercel gives each push its own permanent *.vercel.app URL, and each branch
 * one too. They serve the identical site, so anything Google finds there is a
 * duplicate of the live domain competing with it - and the branch holding the
 * PREVIOUS site is the worst case, because it would keep the old business
 * crawlable long after the domain stopped serving it.
 *
 * Matching on the .vercel.app suffix rather than on an allowlist of production
 * hostnames is deliberate. An allowlist has a failure mode this does not: add a
 * custom domain, forget to list it, and the live site quietly goes noindex.
 * This rule cannot misfire that way - it can only ever apply to a Vercel
 * deployment URL, never to a domain the client owns.
 *
 * X-Robots-Tag rather than a robots.txt rule, because robots.txt is prerendered
 * at build time and cannot see which host the request arrived on. The header is
 * also the stronger signal: it removes a URL already in the index, where a
 * disallow only stops the recrawl that would have removed it.
 */
function isPreviewHost(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  return host.endsWith(".vercel.app");
}

export function middleware(request: NextRequest) {
  const password = process.env.STAGING_PASSWORD;

  // Production leaves this unset, so the site is public as normal.
  if (!password) {
    if (isPreviewHost(request)) {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }
    return NextResponse.next();
  }

  const header = request.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    let supplied = "";
    try {
      supplied = atob(header.slice("Basic ".length));
    } catch {
      supplied = "";
    }
    // Accept either "anything:password" or a bare password as the username, so
    // whoever you send the link to does not have to guess which box to use.
    const [user, ...rest] = supplied.split(":");
    const given = rest.join(":");
    if (given === password || user === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse(
    "This site is not public yet. It is a staging build of tryACOwork.com.",
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="tryACOwork staging", charset="UTF-8"',
        "Content-Type": "text/plain; charset=utf-8",
        // Never let a proxy or a CDN cache the challenge or the response.
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    }
  );
}

export const config = {
  /**
   * Everything except the build's own static assets and the favicon. Hashed
   * JS, CSS and font files are not worth challenging - the browser has already
   * sent credentials for the page that references them - and excluding them
   * keeps the protected site fast to load.
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
