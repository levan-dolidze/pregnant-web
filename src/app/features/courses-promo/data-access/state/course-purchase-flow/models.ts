export interface PersonalInfo {
  userName: string | null;
  userLastName: string | null;
}

export interface ContactInfo {
  email: string | null;
  mobileNumber: string | null;
}

export interface PurchaseCourseRequest {
  sessionId: string;
  userName: string;
  userLastName: string;
  email: string;
  mobileNumber: string;
  productId: number;
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
    userName: null,
    userLastName: null,
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
