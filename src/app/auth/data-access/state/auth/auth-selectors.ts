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
export const iSAuthState = createSelector(
  authFeature,
  (auth) => !!auth.authResponse?.accessToken
);
export const token = createSelector(
  authFeature,
  (auth) => auth.authResponse?.accessToken
);


export const selectLoginLoading = createSelector(
  authFeature,
  (state) => state.loading
);

