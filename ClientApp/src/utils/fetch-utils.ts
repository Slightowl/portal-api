import { redirect } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Logger } from "./logger";

export const get = async <T = any>(url: string, headers?: HeadersInit): Promise<T | FetchError> => {

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  return await parse<T>(response);
};

export const post = async <T = any>(url: string, body: any, headers?: HeadersInit): Promise<T | FetchError> => {

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  return await parse<T>(response);
};

export const put = async <T = any>(url: string, body: any, headers?: HeadersInit): Promise<T | FetchError> => {

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  return await parse<T>(response);
};

const parse = async <T>(response: Response): Promise<T | FetchError> => {
  if (!response.ok) {
    Logger.warn('api request failure', response.statusText);

    if (response.status === 401) {
      redirect(AppRoutes.login);
      return { code: response.status, status: response.statusText };
    }
    else if (response.status === 500) {
      throw new Error('An unexpected error has occurred. Please refresh and try again.');
    }
  }

  let responseJson = null;
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      responseJson = await response.json();
    }
  } catch (error) {
    console.error('Error parsing json response', error);
  }

  return response.ok
    ? responseJson as T
    : {
      code: response.status,
      status: response.statusText,
    };
};

export type FetchError = {
  code: number;
  status: string;
};

export const isOk = <T>(t: T | FetchError): t is T =>
  (t as FetchError).code === undefined;

export const isError = <T>(t: T | FetchError): t is FetchError =>
  (t as FetchError).code !== undefined;
