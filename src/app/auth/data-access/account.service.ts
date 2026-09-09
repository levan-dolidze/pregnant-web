import { inject, Injectable } from '@angular/core';


import { ApiResponseBase } from 'src/app/core/utils/models';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api-service/api.service';
import { Login, UserRegister } from '../utils/auth';
import { AuthTokenResponse } from './state/models';

const authBasePath = '/Auth';
const userBasePath = '/User';

export interface ConfirmPasswordChangeRequest {
  personalNumber: string;
  temporaryPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiService = inject(ApiService);
  // readonly permissionsService = inject(NgxPermissionsService);



  public login(params: Login): Observable<ApiResponseBase<AuthTokenResponse>> {
    return this.apiService.post(`${authBasePath}/Login`, params);
  }

  public userRegister(params: UserRegister): Observable<AuthTokenResponse> {
    return this.apiService.post(`${authBasePath}/UserRegister`, params);
  }

  public userCheck(personalNumber: string): Observable<ApiResponseBase<object>> {
    return this.apiService.post(`${userBasePath}/UserCheck`, { user: personalNumber });
  }

  public passwordRecovery(personalNumber: string): Observable<ApiResponseBase<object>> {
    return this.apiService.post(`${authBasePath}/PasswordRecovery`, { personalNumber });
  }

  public confirmPasswordChange(params: ConfirmPasswordChangeRequest): Observable<ApiResponseBase<object>> {
    return this.apiService.post(`${authBasePath}/ConfirmPasswordChange`, params);
  }


  
  

  private getRole(decodedToken: any): string {
    const role =
      decodedToken?.UserRole ??
      decodedToken?.role ??
      decodedToken?.[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return Array.isArray(role) ? role[0] : role ?? '';
  }


  public populate(tokenData: unknown) {

  }

}
