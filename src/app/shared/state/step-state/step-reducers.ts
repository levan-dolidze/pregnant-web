import { createReducer, on } from "@ngrx/store";
import { initAppParams, loadAppStoredParams } from "./step-actions";
import { InitQueryParams } from "./utils";

const initParamsState: InitQueryParams = {
    mode: null,
    lang: null,
    token: null,
    loading: false,
    error: null,
}

export const stepReducer = createReducer(
    initParamsState,
    on(initAppParams, loadAppStoredParams, (state, { query }) => ({
        ...state,
        ...query,
    })),
);

export const stepKey = 'step';
