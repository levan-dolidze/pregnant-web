export interface Login {
    username: string | null;
    password: string | null;
}

export interface UserRegister {
    personalNumber: string | null;
    mobileNumber: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
}