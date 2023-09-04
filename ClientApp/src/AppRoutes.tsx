/**
 * This is a utility to allow strongly typed navigation to any route.
 * NB: This must be maintained alongside the actual route definitions in App.tsx
 */
 export const AppRoutes = {

    /** / */
    home: '/',

    /** /public */
    publicHome: '/public',

    /** /login */
    login: '/login',

    /** /login-problems */
    loginProblems: '/login-problems',

    /** /logout */
    logout: '/logout',

    /** /forms */
    forms: '/forms',

    /** /forms/request/{token} */
    formsRequest: (token: string) => `/forms/request/${token}`,

    /** /forms/request/{token} */
    formsRequestFeedback: (token: string) => `/forms/request/${token}/feedback`,

    /** /forms/new/{token} */
    formsNew: (token: string) => `/forms/new/${token}`,

    /** /forms/view/{formName}/{compositionId} */
    formsView: (formName: string, compositionId: string) => `/forms/view/${formName}/${compositionId}`,

    /** /my-details */
    myDetails: '/my-details',

    /** /help */
    help: '/help',
 }