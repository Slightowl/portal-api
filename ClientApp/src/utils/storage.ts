export type StorageKey = 'jwt';

export type Storage = {
  get: (key: StorageKey) => string | null;
  set: (key: StorageKey, value: string) => void;
  remove: (key: StorageKey) => void;
}

const localStorage: Storage = {
  get: (key: "jwt"): string | null => window.localStorage.getItem(key),
  set: (key: "jwt", value: string): void => window.localStorage.setItem(key, value),
  remove: (key: "jwt"): void => window.localStorage.removeItem(key),
}

export const storage: Storage = localStorage;
