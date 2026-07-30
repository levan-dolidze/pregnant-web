export interface PersonalInfo {
  name: string | null;
  surname: string | null;
}

export interface ContactInfo {
  email: string | null;
  mobileNumber: string | null;
}

export class CoursePurchaseFlowState {
  currentStep: number = 1
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  otpConfirmed: boolean;
  loading: boolean;
  purchased: boolean;
  error: string | null;
}

export const coursePurchaseFlowInitialState: CoursePurchaseFlowState = {
  currentStep: 1,
  personalInfo: {
    name: null,
    surname: null,
  },
  contactInfo: {
    email: null,
    mobileNumber: null,
  },
  otpConfirmed: false,
  loading: false,
  purchased: false,
  error: null,
};
