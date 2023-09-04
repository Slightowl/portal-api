import * as Fetch from "src/utils/fetch-utils";
import { FetchError } from "src/utils/fetch-utils";
import { storage } from "src/utils/storage";
import { useFakeApi, delay, getHeaders } from "../utils";
import { data, tokens } from "./_fakeData";
import { LoginChallenge, VerifiedLoginResponse, AuthUser } from "./_types";

export type AuthApi = {
  login(surname: string, postcode: string, dateOfBirth: number): Promise<LoginChallenge>;
  sendVerificationCode(requestId: string, number: string): Promise<any>;
  checkVerificationCode(requestId: string, code: string): Promise<VerifiedLoginResponse>;
  checkNhsNumber(requestId: string, nhsNumber: string): Promise<VerifiedLoginResponse>;
  getAuthUser(): Promise<AuthUser>;
}

const api: AuthApi = {
  login: async (surname: string, postcode: string, dateOfBirth: number): Promise<LoginChallenge> => {

    const headers = getHeaders('without-token');

    const dob = new Date(dateOfBirth).toISOString();

    const body = {
      surname,
      postcode,
      dob,
    };

    const res = await Fetch.post<LoginChallenge>('api/auth/login', body, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  },

  sendVerificationCode: async (requestId: string, number: string): Promise<any> => {
    const headers = getHeaders('without-token');

    const body = {
      requestId,
      number,
    };

    const res = await Fetch.post<any>('api/auth/send-code', body, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  },

  checkVerificationCode: async (requestId: string, code: string): Promise<VerifiedLoginResponse> => {
    const headers = getHeaders('without-token');

    const body = {
      requestId,
      code,
    };

    const res = await Fetch.post<any>('api/auth/verify-code', body, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  },

  checkNhsNumber: async (requestId: string, nhsNumber: string): Promise<VerifiedLoginResponse> => {
    const headers = getHeaders('without-token');

    const body = {
      requestId,
      nhsNumber,
    };

    const res = await Fetch.post<any>('api/auth/verify-nhs', body, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  },

  getAuthUser: async (): Promise<AuthUser> => {
    const headers = getHeaders();

    const res = await Fetch.get<AuthUser>('api/auth/user-details', headers)

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  }
};

const fake: AuthApi = {
  login: async (surname: string, postcode: string, dateOfBirth: number): Promise<LoginChallenge> => {
    await delay(1000);

    if (surname === 'fail' || surname === 'error') {
      return Promise.reject({
        code: 400,
        status: 'BadRequest',
      } as FetchError);
    }

    if (surname === 'nhs') {
      return Promise.resolve({
        requestId: '250882b2-3239-4f5a-99b3-3be827bae7d6',
        challengeType: "nhs"
      });
    }

    if (surname === 'email') {
      return Promise.resolve({
        requestId: '250882b2-3239-4f5a-99b3-3be827bae7d6',
        challengeType: "code",
        numbers: []
      });
    }

    return Promise.resolve({
      requestId: '250882b2-3239-4f5a-99b3-3be827bae7d6',
      challengeType: "code",
      numbers: [
        '07*** ***123',
        '07*** ***456',
        '07*** ***799',
        '07*** ***010',
      ]
    })
  },

  sendVerificationCode: (requestId: string, number: string): Promise<any> => {
    return Promise.resolve();
  },

  checkVerificationCode: (requestId: string, code: string): Promise<VerifiedLoginResponse> => {
    if (code === '000000') {
      return Promise.reject({
        code: 400,
        status: 'BadRequest',
      } as FetchError);
    }

    return Promise.resolve({
      jwt: tokens.valid,
      user: data['venkman'],
    });
  },

  checkNhsNumber: (requestId: string, nhsNumber: string): Promise<VerifiedLoginResponse> => {
    if (nhsNumber === '000') {
      return Promise.reject({
        code: 400,
        status: 'BadRequest',
      } as FetchError);
    }

    return Promise.resolve({
      jwt: tokens.valid,
      user: data['venkman'],
    });
  },

  getAuthUser: async (): Promise<AuthUser> => {
    const token = storage.get('jwt');
    if (token) {
      await delay(1000);
      return data['venkman'];
    }

    return Promise.reject({
      code: 401,
      status: 'Unauthorized',
    } as FetchError);
  }
};

export default useFakeApi ? fake : api;
