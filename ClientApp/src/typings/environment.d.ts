declare global {

  interface ImportMetaEnv {
    VITE_ENV_DESCRIPTION: string;

    // LOCAL DEV SETTINGS
    VITE_USE_FAKE_DATA: "true" | "false";
    VITE_USE_NULL_LOGGER: "true" | "false";

    // EHR SERVER
    VITE_EHR_SERVER_URL: string;
    VITE_EHR_SUBJECT_NAMESPACE: string;
    VITE_EHR_LOCAL_USERNAME: string;
    VITE_EHR_LOCAL_PASSWORD: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export { }