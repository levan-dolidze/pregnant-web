import { createAction, props } from "@ngrx/store";
import { Login, UserRegister } from "src/app/auth/utils/auth";
import { AuthTokenResponse, LoginErrResponse } from "../models";

export const login = createAction(
  "[Auth] Login",
  props<{ loginRequest: Login }>()
);
export const loginSuccess = createAction(
  "[Auth] LoginSuccess",
  props<{ tokenGroup: AuthTokenResponse }>()
);
export const loginError = createAction(
  '[Auth] Login Error',
  props<{ message: LoginErrResponse }>()
);

export const userRegister = createAction(
  "[Auth] User Register",
  props<{ registerRequest: UserRegister }>()
);
export const userRegisterSuccess = createAction(
  "[Auth] User Register Success",
  props<{ tokenGroup: AuthTokenResponse }>()
);
export const userRegisterError = createAction(
  '[Auth] User Register Error',
  props<{ message: LoginErrResponse }>()
);



export const backToCredentials = createAction(
  '[Auth] Back To Credentials',
);

export const loginOtpSent = createAction('[Auth] Login Otp Sent');
export const logOutSuccess = createAction('[Auth] Logout Success');


export const logout = createAction("[Auth] Log Out");