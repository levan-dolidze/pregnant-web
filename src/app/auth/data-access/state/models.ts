

export interface AccountSource {
  // account: Account;
  authResponse: AuthTokenResponse | null
  loaded: boolean;
  loading: boolean;
}

export interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
}

export const authInitialState: AccountSource = {
  authResponse: null,
  loaded: false,
  loading: false,
}


export interface LoginErrResponse {
  code: number;
  description: string;
}
