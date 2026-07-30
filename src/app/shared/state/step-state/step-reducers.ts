import { createReducer, on } from "@ngrx/store";
import { goTo, initAppParams, loadAppStoredParams } from "./step-actions";
import { InitQueryParams } from "./utils";

const initParamsState: InitQueryParams = {
    mode: null,
    lang: null,
    token: null,
    loading: false,
    error: null,
    currentStep: 1
}

export const stepReducer = createReducer(
    initParamsState,
    on(initAppParams, loadAppStoredParams, (state, { query }) => ({
        ...state,
        ...query,
    })),
    on(goTo, (state, { step }) => ({
        ...state,
        currentStep: step
    })),
);

export const stepKey = 'step';
