import { inject, Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';

export interface ContactRequest {
  mobileNumber: string | null;
  question: string | null;
}
const basePath = '/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly apiService = inject(ApiService)


  getContactInfo() {
    return this.apiService
      .get(`${basePath}/GetContactInfo`)
  }


  
}
