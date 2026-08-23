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

export function middleware(request: NextRequest) {
  const password = process.env.STAGING_PASSWORD;

  // Production leaves this unset, so the site is public as normal.
  if (!password) return NextResponse.next();

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
