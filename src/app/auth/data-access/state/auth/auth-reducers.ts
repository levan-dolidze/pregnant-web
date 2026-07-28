import { createReducer, on } from '@ngrx/store';
import {
  approveLogin,
  approveLoginError,
  approveLoginSuccess,
  backToCredentials,
  login,
  loginError,
  loginSuccess,
  logout,
  logOutSuccess,
} from './auth-actions';
import { AccountSource, authInitialState } from '../models';

export const authReducer = createReducer<AccountSource>(
  authInitialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),

  on(loginSuccess, (state) => ({
    ...state,
    loading: false,
    otpSent: true,
  })),

  on(loginError, (state) => ({
    ...state,
    loading: false,
  })),

  on(approveLogin, (state) => ({
    ...state,
    loading: true,
  })),

  on(approveLoginSuccess, (state, { tokenGroup }) => ({
    ...state,
    authResponse: tokenGroup,
    loaded: true,
    loading: false,
  })),
  
  on(backToCredentials, (state) => ({
    ...state,
    otpSent: false,
    loaded: true,
    loading: false,
  })),

  on(approveLoginError, (state, { message }) => ({
    ...state,
    loading: false,
    err: message
  })),

  on(logout, logOutSuccess, (state) => ({
    ...state,
    authResponse: null,
    loaded: false,
    loading: false,
    otpSent: false,
  })),
);

export const authKey = 'auth';
