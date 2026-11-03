const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

export function sanitizeText(value: string): string {
  return value.replace(CONTROL_CHARS, "").trim();
}

export function getExternalLinkProps() {
  return {
    target: "_blank",
    rel: "noopener noreferrer nofollow",
  } as const;
}

export function createMailtoHref(email: string, subject: string, body: string) {
  const safeEmail = sanitizeText(email).replace(/[^a-zA-Z0-9@._%+\-]/g, "");
  const safeSubject = sanitizeText(subject).replace(/\s+/g, " ");
  const safeBody = sanitizeText(body).replace(/\r?\n/g, "\n");

  const href = new URL(`mailto:${safeEmail}`);
  href.searchParams.set("subject", safeSubject);
  href.searchParams.set("body", safeBody);

  return href.toString();
}
