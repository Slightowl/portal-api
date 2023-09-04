import * as Fetch from "src/utils/fetch-utils";
import { useFakeApi, delay, getHeaders } from "../utils";
import { UserPreferences, CommunicationPreferences } from "./_types";

export type PreferencesApi = {
  getUserPreferences(): Promise<UserPreferences>;
  updateUserPreferences(prefs: UserPreferences): Promise<void>;
  getCommunicationPreferences(): Promise<CommunicationPreferences>;
  updateCommunicationPreferences(prefs: CommunicationPreferences): Promise<void>;
}

const api: PreferencesApi = {
  getUserPreferences: async (): Promise<UserPreferences> => {
    const headers = getHeaders();

    const res = await Fetch.get<{ userId: string, preferences: UserPreferences }>('api/preferences/user', headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res.preferences;
  },

  updateUserPreferences: async (prefs: UserPreferences): Promise<void> => {
    const headers = getHeaders();

    const res = await Fetch.post('api/preferences/user', prefs, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }
  },

  getCommunicationPreferences: async (): Promise<CommunicationPreferences> => {
    const headers = getHeaders();

    const res = await Fetch.get<CommunicationPreferences>('api/preferences/comms', headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }

    return res;
  },

  updateCommunicationPreferences: async (prefs: CommunicationPreferences): Promise<void> => {
    const headers = getHeaders();

    const res = await Fetch.post('api/preferences/comms', prefs, headers);

    if (Fetch.isError(res)) {
      return Promise.reject(res);
    }
  }
}

const fake: PreferencesApi = {
  getUserPreferences: async (): Promise<UserPreferences> => {
    await delay(1000);
    return {
      'some-key': 'some-value',
    };
  },
  updateUserPreferences: (prefs: UserPreferences): Promise<void> => {
    return delay(1000);
  },
  getCommunicationPreferences: async (): Promise<CommunicationPreferences> => {
    await delay(1000);
    return {
      contactViaEmail: true,
      contactViaSms: false,
      contactViaPost: true,
    };
  },
  updateCommunicationPreferences: (prefs: CommunicationPreferences): Promise<void> => {
    return delay(1000);
  }
}

export default useFakeApi ? fake : api;