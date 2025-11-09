import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Minimal helper for JSON fetch with typed response
export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// Convert HTML to plain text safely in the browser.
// - Replaces common block separators with newlines before parsing
// - Uses DOMParser to decode entities
// - Normalizes whitespace a bit
export function htmlToPlainText(html: string): string {
  try {
    const withBreaks = html
      .replace(/<br\s*\/?\s*>/gi, "\n")
      .replace(/<\/(p|div|h[1-6]|li)\s*>/gi, "\n");
    const parser = new DOMParser();
    const doc = parser.parseFromString(withBreaks, 'text/html');
    const raw = (doc.body.innerText || doc.body.textContent || '').replace(/\u00A0/g, ' ');
    return raw.replace(/\n{3,}/g, '\n\n').trim();
  } catch {
    return html;
  }
}
