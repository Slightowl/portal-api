export interface LoginChallenge {
  requestId: string;
  challengeType: 'nhs' | 'code'
  numbers?: string[];
}

export interface VerifiedLoginResponse {
  jwt: string;
  user: AuthUser;
}

export interface AuthUser {
  forename: string,
  surname: string;
  postcode: string;
  email: string;
  phone: string;
  christieNumber: string;
}