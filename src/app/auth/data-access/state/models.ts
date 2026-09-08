

export interface AccountSource {
  // account?: Account;
  authResponse: AuthTokenResponse | null
  loaded: boolean;
  loading: boolean;
}

// export interface Account {

// }

export interface AuthTokenResponse {
  accessToken: string;
  expiresIn: number;
  role: string;
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
