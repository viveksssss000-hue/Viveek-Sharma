import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * GET /api/admin/auth - starts the GitHub sign-in for the editor at /admin.
 *
 * WHY THIS IS HERE AND NOT A THIRD-PARTY SERVICE
 * The CMS needs a GitHub access token, and GitHub will not issue one to a
 * browser: the code-for-token exchange needs a client secret, which has to
 * stay server-side. The usual answer is to deploy somebody else's OAuth proxy.
 * This is the same handshake in two small routes on this site's own domain -
 * one fewer account to own, one fewer service to trust with a token that can
 * write to the repository, and one fewer thing to go stale.
 *
 * The flow is the Netlify/Decap protocol the CMS expects:
 *   1. /api/admin/auth        -> redirect to GitHub's consent screen
 *   2. GitHub                 -> /api/admin/callback?code=...
 *   3. /api/admin/callback    -> postMessage the token back to /admin
 *
 * The `state` parameter is a random value stored in a short-lived, HttpOnly,
 * SameSite=Lax cookie and checked on the way back. That is what stops an
 * attacker from completing someone else's sign-in (CSRF on the OAuth flow).
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      {
        error:
          "GITHUB_OAUTH_CLIENT_ID is not set. See README, 'Setting up the editor'.",
      },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const state = randomBytes(24).toString("hex");

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/admin/callback`);
  // `repo` is the narrowest scope that can commit to a private repository. A
  // public repository only needs `public_repo` - tighten it if that is the case.
  authorize.searchParams.set("scope", process.env.GITHUB_OAUTH_SCOPE ?? "repo");
  authorize.searchParams.set("state", state);

  const response = NextResponse.redirect(authorize.toString());
  response.cookies.set("admin_oauth_state", state, {
    httpOnly: true,
    secure: url.protocol === "https:",
    sameSite: "lax",
    path: "/api/admin",
    maxAge: 600,
  });
  return response;
}
