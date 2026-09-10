import { createReducer, on } from '@ngrx/store';
import {
  backToCredentials,
  login,
  loginError,
  loginSuccess,
  logout,
  logOutSuccess,
  userRegister,
  userRegisterError,
  userRegisterSuccess,
} from './auth-actions';
import { AccountSource, authInitialState } from '../models';

export const authReducer = createReducer<AccountSource>(
  authInitialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(loginSuccess, (state, { tokenGroup }) => ({
    ...state,
    authResponse: tokenGroup,
    loading: false,
    otpSent: true,
  })),

  on(loginError, (state) => ({
    ...state,
    loading: false,
  })),

  // on(approveLogin, (state) => ({
  //   ...state,
  //   loading: true,
  // })),


  on(backToCredentials, (state) => ({
    ...state,
    otpSent: false,
    loaded: true,
    loading: false,
  })),

  // on(approveLoginError, (state, { message }) => ({
  //   ...state,
  //   loading: false,
  //   err: message
  // })),

  on(logout, logOutSuccess, (state) => ({
    ...state,
    authResponse: null,
    loaded: false,
    loading: false,
    otpSent: false,
  })),

  on(userRegister, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(userRegisterSuccess, (state, { tokenGroup }) => ({
    ...state,
    loading: false,
    authResponse: tokenGroup,
    loaded: true,
  })),

  on(userRegisterError, (state) => ({
    ...state,
    loading: false,
  })),
);

export const authKey = 'auth';
