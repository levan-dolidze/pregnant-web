export interface VerifyOtpRequest {
    code: string,
    mobileNumber: string;
}

export interface OtpRequest {
    mobileNumber: string,
}
export interface OtpResponse {
    description: string
    devOtpCode: string
}