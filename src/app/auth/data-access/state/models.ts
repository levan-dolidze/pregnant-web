

export interface AccountSource {
  // account?: Account;
  authResponse: AuthTokenResponse | null
  loaded: boolean;
  loading: boolean;
}

// export interface Account {

// }

export interface AuthUser {
  id: number;
  role: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  expiresIn: number;
  user: AuthUser;
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
