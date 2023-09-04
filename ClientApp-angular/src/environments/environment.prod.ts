export const environment = {
  production: true,
  useFakeData: false,
  
  // logging
  logLevel: '#{ENVIRONMENT_LOG_LEVEL}#',
  
  // ehr server
  ehrServerUrl: '#{EHR_SERVER_URL}#',
  ehrSubjectNamespace: '#{EHR_SERVER_SUBJECT_NAMESPACE}#',
  ehrLocalUsername: null,
  ehrLocalPassword: null,

  // christie
  christieWebsite: 'https://www.christie.nhs.uk/',
};
