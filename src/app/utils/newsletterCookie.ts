const COOKIE_NAME = "beele_newsletter_registered";

export function hasNewsletterCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((row) => row.startsWith(`${COOKIE_NAME}=`));
}

export function setNewsletterCookie(): void {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE_NAME}=true; path=/; max-age=${maxAge}; SameSite=Lax`;
}
