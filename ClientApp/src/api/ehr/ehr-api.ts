import * as Fetch from "src/utils/fetch-utils";
import { useFakeApi, delay, getHeaders } from "../utils";

export type EhrApi = {
  getOrCreateEhrId(): Promise<{ ehrId: string }>;
}

const api: EhrApi = {
  getOrCreateEhrId: async (): Promise<{ ehrId: string; }> => {
    const headers = getHeaders();

    const res = await Fetch.get<{ ehrId: string }>(`api/ehr/get-or-create`, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  }
};

const fake: EhrApi = {
  getOrCreateEhrId: async (): Promise<{ ehrId: string; }> => {
    await delay(1000);

    return { ehrId: 'ec8a40a6-5c4a-43fb-85d7-9cc5fb033ca1' };
  }
};

export default useFakeApi ? fake : api;
