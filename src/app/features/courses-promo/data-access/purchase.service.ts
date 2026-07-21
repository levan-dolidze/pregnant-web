import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api-service/api.service';
import { CoursePurchaseRequest } from '../models/course-purchase.model';


const basePath = '/Courses';

@Injectable({
  providedIn: 'root'
})


export class PurchaseService {


  private readonly apiService = inject(ApiService)


  pay(params: CoursePurchaseRequest): Observable<any> {
    return this.apiService
      .post(`${basePath}/PurchasePregnantCourse`, params)
  }

}
