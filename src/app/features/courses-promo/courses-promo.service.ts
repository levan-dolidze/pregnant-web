import { Injectable, signal } from '@angular/core';
export interface CoursePromoSummary {
  courseName: string;
  title: string;
  description: string;
  lessonQty: number;
  price: number;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesPromoService {

    readonly coursePromo = signal<CoursePromoSummary>({
      courseName: 'მშობელთა სკოლა',
      title: 'კურსი ორსულობა/მშობიარობის შესახებ',
      description: 'კომპლექსური ვიდეო კურსი, რომელიც მოიცავს ორსულობის, მშობიარობისა და ახალშობილის მოვლის ყველა მნიშვნელოვან ასპექტს.მუდმივი კავშირი ჩემთან - გამოცდილ მეან-გინეკოლოგთან სადაც ამომწურავად აგიხსნით თქვენთვის საინტერესო საკითხებს',
      lessonQty:9,
      price: 120,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1'
    });
  
}
