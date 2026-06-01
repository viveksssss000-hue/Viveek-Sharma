/**
 * Verify a Cloudflare Turnstile token server-side.
 * If no secret is configured (e.g. local dev), verification is skipped so the
 * form remains testable — production must set TURNSTILE_SECRET_KEY.
 */
export async function verifyTurnstile(
  token: string | undefined,
  req?: Request
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Not configured — skip (dev/testing). See BUILD.md §8.
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);

  const ip = req?.headers.get("CF-Connecting-IP");
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
