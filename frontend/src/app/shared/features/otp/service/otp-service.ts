import { inject, Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { OtpRequest, OtpResponse, VerifyOtpRequest } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const basePath = '/Otp';

@Injectable({
  providedIn: 'root',
})


export class OtpService {

  private readonly apiService = inject(ApiService)
  readonly tempHttpClient = inject(HttpClient)


  requestOtp(params: OtpRequest): Observable<OtpResponse> {
    return this.apiService
      .post(`${basePath}/requestOtp`, params)
  }


  confirmOtp(params: VerifyOtpRequest) {
    return this.apiService
      .post(`${basePath}/confirmOtp`, params)
  }



}
