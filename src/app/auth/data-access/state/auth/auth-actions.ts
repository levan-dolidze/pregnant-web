import { createAction, props } from "@ngrx/store";
import { Login } from "src/app/auth/utils/auth";
import { AuthTokenResponse, LoginErrResponse } from "../models";

export const login = createAction(
  "[Auth] Login",
  props<{ loginRequest: Login }>()
);
export const loginSuccess = createAction(
  "[Auth] LoginSuccess",
  props<{ success: boolean }>()
);
export const loginError = createAction(
  '[Auth] Login Error',
  props<{ message: LoginErrResponse }>()
);


export const approveLoginSuccess = createAction(
  '[Auth] Approve Login Success',
  props<{ tokenGroup: AuthTokenResponse }>()
);
export const approveLoginError = createAction(
  '[Auth] Approve Login Error',
  props<{ message: string }>()
);

export const backToCredentials = createAction(
  '[Auth] Back To Credentials',
);

export const loginOtpSent = createAction('[Auth] Login Otp Sent');
export const logOutSuccess = createAction('[Auth] Logout Success');


export const logout = createAction("[Auth] Log Out");