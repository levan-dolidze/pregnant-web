export interface VerifyOtpRequest {
    // passwordId: string;
    code: string,
    mobileNumber: string;
    // productName: string | null;
}

export interface OtpRequest {
    mobileNumber: string,
}
export interface OtpResponse {
    description: string
    devOtpCode: string
}