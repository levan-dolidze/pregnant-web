

export interface AccountSource {
  // account: Account;
  authResponse: AuthTokenResponse | null
  loaded: boolean;
  loading: boolean;
  otpSent: boolean
}

export interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export const authInitialState: AccountSource = {
  authResponse: null,
  loaded: false,
  loading: false,
  otpSent: false
}


export interface LoginErrResponse {
  code: number;
  description: string;
}
