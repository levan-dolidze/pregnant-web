import { inject, Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { TokenLoginRequest, TokenLoginResponse } from '../ui/auth-models';
import { Observable } from 'rxjs';


const basePath = '/Tnet';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiService = inject(ApiService)

  tokenLogin(params: TokenLoginRequest): Observable<TokenLoginResponse> {
    return this.apiService
      .post(`${basePath}/TokenLogin`, params)
  }

}
