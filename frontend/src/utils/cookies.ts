import { LOCAL_STORAGE } from "@/constants/constants";

export const getCookieByNameFromSource = (name: string, source: string) => {
  if (!source) return null;
  return source.replace(
    new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`),
    "$1"
  );
};

export const getCookieByName = (name: string) =>
  getCookieByNameFromSource(name, document.cookie);

export function setCookie(name: string, value: string, expires: string) {
  document.cookie = `${name}=${value}; path=/; ${
    expires ? `expires=${new Date(Date.now() + expires)}` : ""
  }`;
}

export const writeStorageCookieConsentTimestamp = (timestamp: number) =>
  typeof window !== "undefined" &&
  window.localStorage.setItem(
    LOCAL_STORAGE.COOKIE_CONSENT_TIMESTAMP,
    String(timestamp)
  );

export const readStorageCookieConsentTimestamp = () =>
  typeof window !== "undefined" && // @ts-ignore
  parseInt(window.localStorage.getItem(LOCAL_STORAGE.COOKIE_CONSENT_TIMESTAMP));
