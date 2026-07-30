import { createReducer, on } from '@ngrx/store';
import {
  goToStep,
  purchaseCourse,
  purchaseCourseFailure,
  purchaseCourseSuccess,
  resetPurchaseFlow,
  saveContactInfo,
  savePersonalInfo,
  setOtpConfirmed,
} from './course-purchase-flow-actions';
import { coursePurchaseFlowInitialState } from './models';

export const coursePurchaseFlowReducer = createReducer(
  coursePurchaseFlowInitialState,

  on(goToStep, (state, { step }) => ({
    ...state,
    currentStep: step,
  })),

  on(savePersonalInfo, (state, { personalInfo }) => ({
    ...state,
    personalInfo,
  })),

  on(saveContactInfo, (state, { contactInfo }) => ({
    ...state,
    contactInfo,
  })),

  on(setOtpConfirmed, (state, { confirmed }) => ({
    ...state,
    otpConfirmed: confirmed,
  })),

  on(purchaseCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(purchaseCourseSuccess, (state) => ({
    ...state,
    loading: false,
    purchased: true,
  })),

  on(purchaseCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(resetPurchaseFlow, () => coursePurchaseFlowInitialState)
);

export const coursePurchaseFlowKey = 'coursePurchaseFlow';
