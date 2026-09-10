import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie';

export interface UserProfile {
  TnetUserId: string;
  ProductId: string;
  DarkMode: string;
  Language: string;
  exp: number;
  iss: string;
  aud: string;
}

@Injectable({ providedIn: 'root' })
export class JwtService {


  readonly cookieService = inject(CookieService);

  getToken(tokenType: string): string {
    return this.cookieService.get(tokenType)
  }

  saveToken(tokenType:string,token:string) {
    this.cookieService.put(tokenType,token)
  }

  destroyToken(tokenType:string) {
    this.cookieService.remove(tokenType)
  }


  getDecodedAccessToken(token: string): UserProfile {
  try {
    return jwtDecode(token);
  } catch  {
    return null;
  }
}

}
