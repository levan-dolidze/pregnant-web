import { createFeatureSelector, createSelector } from "@ngrx/store";
import { stepKey } from "./step-reducers";
import { InitQueryParams } from "./utils";

export const selectStepState =
    createFeatureSelector<InitQueryParams>(stepKey);

export const selectStep = createSelector(
    selectStepState,
    (state) => state
);
export const accessTokenState = createSelector(
    selectStepState,
    (state) => state.token ?? ''
);
export const modeState = createSelector(
    selectStepState,
    (state) => state.mode
);
export const policiesLoadingState = createSelector(
    selectStepState,
    (state) => state.loading
);


export const currentStepState = createSelector(
    selectStepState,
    (state) => state.currentStep
);
