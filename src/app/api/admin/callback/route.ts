import { NextResponse } from "next/server";

/**
 * GET /api/admin/callback - finishes the GitHub sign-in for the editor.
 *
 * Exchanges the one-time code for an access token server-side (the client
 * secret never reaches the browser), then hands the token to the CMS window
 * that opened this one, using the message format Decap and Sveltia both expect:
 *
 *   authorization:github:success:{"token":"...","provider":"github"}
 *
 * The message is targeted at this site's own origin rather than "*", so the
 * token cannot be read by another page that happens to be listening.
 */

export const dynamic = "force-dynamic";

function page(script: string) {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
      `<title>Signing in…</title></head><body>` +
      `<p style="font-family:system-ui;margin:2rem">Signing in…</p>` +
      `<script>${script}</script></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function fail(message: string) {
  // Serialised twice on purpose: once into the CMS's message payload, and once
  // as a JavaScript string literal, so a quote in the message cannot break the
  // script it is embedded in.
  const payload = JSON.stringify(
    `authorization:github:error:${JSON.stringify({ message })}`
  );
  const readable = JSON.stringify(message);

  return page(
    `(function(){` +
      `if(window.opener){window.opener.postMessage(${payload},window.location.origin);}` +
      `document.body.textContent=${readable};` +
      `})();`
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return fail(
      "The editor sign-in is not configured. GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET must be set."
    );
  }
  if (!code) return fail("GitHub did not return an authorization code.");

  // CSRF check: the state must match the cookie set when the flow started.
  const cookieState = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("admin_oauth_state="))
    ?.slice("admin_oauth_state=".length);

  if (!state || !cookieState || state !== cookieState) {
    return fail("Sign-in could not be verified. Please try again.");
  }

  let token: string | undefined;
  try {
    const exchange = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${url.origin}/api/admin/callback`,
      }),
    });
    const data = (await exchange.json()) as {
      access_token?: string;
      error_description?: string;
    };
    if (data.error_description) return fail(data.error_description);
    token = data.access_token;
  } catch {
    return fail("Could not reach GitHub to complete sign-in.");
  }

  if (!token) return fail("GitHub did not return an access token.");

  const payload = JSON.stringify({ token, provider: "github" });
  const response = page(
    `(function(){` +
      `var message='authorization:github:success:'+${JSON.stringify(payload)};` +
      `function send(){if(window.opener){window.opener.postMessage(message,window.location.origin);}}` +
      // The CMS may not be listening yet, so announce, wait for its
      // handshake, announce again, then close.
      `window.addEventListener('message',function(e){if(e.data==='authorizing:github'){send();}});` +
      `send();` +
      `setTimeout(function(){send();window.close();},900);` +
      `})();`
  );

  // The state cookie has done its job.
  response.cookies.set("admin_oauth_state", "", {
    httpOnly: true,
    path: "/api/admin",
    maxAge: 0,
  });
  return response;
}
