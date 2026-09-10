import { inject, Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { PurchaseCourseRequest } from './state/course-purchase-flow/models';

const basePath = '/Register';

@Injectable({
  providedIn: 'root'
})


export class PurchaseService {


  private readonly apiService = inject(ApiService)


  registerOrder(params: PurchaseCourseRequest) {
    return this.apiService
      .post(`${basePath}/RegisterOrder`, params)
  }

}
