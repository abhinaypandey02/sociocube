export async function verifyCaptcha(token: string) {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    },
  );
  if (res.ok) {
    const data = (await res.json()) as { success: boolean };
    return data.success;
  }
  return false;
}
