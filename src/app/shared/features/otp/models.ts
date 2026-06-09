export interface VerifyOtpRequest {
    passwordId: string;
    code: string,
    phoneNumber: string;
    productName: string | null;
}

export interface OtpRequest {
    mobileNumber: string,
}
export interface OtpResponse {
    guid: string
}