import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api-service/api.service';
import { CoursePurchaseRequest } from '../models/course-purchase.model';


const basePath = '/Courses';

export interface CoursePromoSummary {
  courseName: string;
  title: string;
  description: string;
  lessonQty: number;
  price: string;
}

@Injectable({
  providedIn: 'root'
})


export class PurchaseService {


  private readonly apiService = inject(ApiService)

  readonly coursePromo = signal<CoursePromoSummary>({
    courseName: 'მშობელთა სკოლა',
    title: 'ბავშვის მოვლის ვიდეო კრებული დედებისთვის',
    description: 'კომპლექსური ვიდეო კურსი, რომელიც მოიცავს ორსულობის, მშობიარობისა და ახალშობილის მოვლის ყველა მნიშვნელოვან ასპექტს. Dr. თამარ თევზაძის ხელმძღვანელობით შეიძინეთ ცოდნა, რომელიც ნამდვილად გამოგადგებათ.',
    lessonQty: 6,
    price: '₾149',
  });


  pay(params: CoursePurchaseRequest): Observable<any> {
    return this.apiService
      .post(`${basePath}/PurchasePregnantCourse`, params)
  }

}
