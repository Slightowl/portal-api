import * as Fetch from "src/utils/fetch-utils";
import { FetchError } from "src/utils/fetch-utils";
import { useFakeApi, delay, getHeaders } from "../utils";
import { FormRequest } from "./_types";

export type PromsApi = {
  getFormRequest(token: string): Promise<FormRequest>;
  decline(token: string, formName: string, reason: string): Promise<void>;
  postNewPromCompleted(token: string, compositionId: string): Promise<void>;
  getFormRequests(): Promise<FormRequest[]>;
}

const api: PromsApi = {
  getFormRequest: async (token: string): Promise<FormRequest> => {
    const headers = getHeaders();

    const res = await Fetch.get<FormRequest>(`api/proms/${token}`, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  },

  decline: async (token: string, formName: string, reason: string): Promise<void> => {
    const headers = getHeaders();

    const body = {
      token,
      formName,
      reason: reason || 'None Provided'
    }

    const res = await Fetch.post(`api/proms/decline`, body, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }
  },

  postNewPromCompleted: async (token: string, compositionId: string): Promise<void> => {
    const headers = getHeaders();

    const body = {
      token,
      compositionId,
    }

    const res = await Fetch.post(`api/proms/completed`, body, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }
  },

  getFormRequests: async (): Promise<FormRequest[]> => {
    const headers = getHeaders();

    const res = await Fetch.get<FormRequest[]>(`api/proms`, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  }
};

const fake: PromsApi = {
  getFormRequest: async (token: string): Promise<FormRequest> => {
    await delay(1000);

    if (token === 'error') {
      return Promise.reject({
        code: 400,
        status: "BadRequest"
      } as FetchError);
    }

    if (token === 'expired') {
      return Promise.resolve<FormRequest>({
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Expired',
        formName: 'PRO_HER2',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        christieNumber: '12345678',
        token: 'abc123'
      });
    }

    if (token === 'done') {
      return Promise.resolve<FormRequest>({
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Completed',
        formName: 'PRO_HER2',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        completedAt: new Date("2022-05-26T17:00:00.000Z"),
        compositionId: '23',
        christieNumber: '12345678',
        token: 'abc123'
      });
    }

    return Promise.resolve<FormRequest>({
      id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
      status: 'Pending',
      formName: 'PRO_HER2',
      formVersion: '1.0.2',
      sentAt: new Date("2022-05-23T17:00:00.000Z"),
      submissionDueAt: new Date("2022-05-29T17:00:00.000Z"),
      completedAt: null,
      compositionId: null,
      christieNumber: '12345678',
      token: 'abc123'
    });
  },

  decline: async (token: string, formName: string, reason: string): Promise<void> => {
    await delay(1000);
  },

  postNewPromCompleted: async (token: string, compositionId: string): Promise<void> => {
    await delay(1000);
  },

  getFormRequests: async (): Promise<FormRequest[]> => {
    const formRequests: FormRequest[] = [
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Pending',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-23T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-29T17:00:00.000Z"),
        completedAt: null,
        compositionId: null,
        christieNumber: '12345678',
        token: 'abc123'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Completed',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        completedAt: new Date("2022-05-26T17:00:00.000Z"),
        compositionId: '23',
        christieNumber: '12345678',
        token: 'abc123'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Expired',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        christieNumber: '12345678',
        token: 'abc123'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Declined',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        declinedAt: new Date("2022-05-26T17:00:00.000Z"),
        christieNumber: '12345678',
        token: 'abc123'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Pending',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-03-23T07:56:00.000Z"),
        submissionDueAt: new Date("2022-06-29T12:00:00.000Z"),
        completedAt: null,
        compositionId: null,
        christieNumber: '12345678',
        token: 'abc123'
      }
    ];

    await delay(1000);

    return formRequests;
  }
};

export default useFakeApi ? fake : api;
