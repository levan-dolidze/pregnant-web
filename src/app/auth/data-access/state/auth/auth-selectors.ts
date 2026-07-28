import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AccountSource } from "../models";

export const authFeature = createFeatureSelector<AccountSource>('auth');

export const selectAccount = createSelector(
  authFeature,
  (state) => state.authResponse
);
export const selectLoginLoaded = createSelector(
  authFeature,
  (state) => state.loaded
);
export const loading = createSelector(
  authFeature,
  (state) => state.loading
);
export const selectIsAuth = createSelector(
  authFeature,
  (auth) => !!auth.authResponse?.access_token
);

export const otpSent = createSelector(
  authFeature,
  (auth) => !!auth.otpSent
);

export const selectLoginLoading = createSelector(
  authFeature,
  (state) => state.loading
);

export const selectOtpSent = createSelector(
  authFeature,
  (state) => state.otpSent
);