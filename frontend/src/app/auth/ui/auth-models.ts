
export interface TokenLoginRequest {
    token: string
}


export interface TokenLoginResponse {
    tokenValue: string,
    expireDate:Date,
    redirectUrl: string
}