import { inject, Injectable } from '@angular/core';


import { ApiResponseBase } from 'src/app/core/utils/models';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api-service/api.service';
import { Login } from '../utils/auth';

const authBasePath = '/api/Auth';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiService = inject(ApiService);
  // readonly permissionsService = inject(NgxPermissionsService);



  public login(params: Login): Observable<ApiResponseBase<unknown>> {
    return this.apiService.post(`${authBasePath}/Login`, params);
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
