import { createAction, props } from '@ngrx/store';
import { ContactInfo, PersonalInfo } from './models';

export const goToStep = createAction(
  '[Course Purchase Flow] Go To Step',
  props<{ step: number }>()
);

export const savePersonalInfo = createAction(
  '[Course Purchase Flow] Save Personal Info',
  props<{ personalInfo: PersonalInfo, step?: number }>()
);

export const saveContactInfo = createAction(
  '[Course Purchase Flow] Save Contact Info',
  props<{ contactInfo: ContactInfo }>()
);

export const setOtpConfirmed = createAction(
  '[Course Purchase Flow] Set Otp Confirmed',
  props<{ confirmed: boolean }>()
);

export const purchaseCourse = createAction(
  '[Course Purchase Flow] Purchase Course'
);

export const purchaseCourseSuccess = createAction(
  '[Course Purchase Flow] Purchase Course Success'
);

export const purchaseCourseFailure = createAction(
  '[Course Purchase Flow] Purchase Course Failure',
  props<{ error: string }>()
);

export const resetPurchaseFlow = createAction(
  '[Course Purchase Flow] Reset Purchase Flow'
);
