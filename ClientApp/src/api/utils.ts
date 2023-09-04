import { storage } from "src/utils/storage";

export const useFakeApi =
  import.meta.env.VITE_USE_FAKE_DATA === "true"
  && import.meta.env.PROD.toString() === "false";

export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getHeaders = (withoutToken?: 'without-token'): HeadersInit => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  if (withoutToken) {
    return headers;
  }

  const token = storage.get('jwt');

  return {
    ...headers,
    'Authorize': `Bearer ${token}`,
  }
};
