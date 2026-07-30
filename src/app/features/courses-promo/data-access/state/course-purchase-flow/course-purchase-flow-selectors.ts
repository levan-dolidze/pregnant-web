import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursePurchaseFlowKey } from './course-purchase-flow-reducers';
import { CoursePurchaseFlowState } from './models';

export const selectCoursePurchaseFlowState =
  createFeatureSelector<CoursePurchaseFlowState>(coursePurchaseFlowKey);

export const coursePurchaseFlowState = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state
);
export const selectCurrentStep = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state.currentStep
);

export const selectPersonalInfo = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state.personalInfo
);

export const selectContactInfo = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state.contactInfo
);

export const selectOtpConfirmed = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state.otpConfirmed
);

export const purchaseLoading = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state.loading
);

export const selectPurchased = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state.purchased
);

export const selectPurchaseError = createSelector(
  selectCoursePurchaseFlowState,
  (state) => state.error
);

export const selectPurchaseRequest = createSelector(
  selectPersonalInfo,
  selectContactInfo,
  (personalInfo, contactInfo) => ({
    name: personalInfo.name,
    surname: personalInfo.surname,
    email: contactInfo.email,
    mob: contactInfo.mobileNumber,
  })
);
