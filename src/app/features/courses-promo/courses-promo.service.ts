import { Injectable, signal } from '@angular/core';
import { CourseId } from 'src/app/shared/utils/enums';
export interface CoursePromoSummary {
  courseName: string;
  title: string;
  description: string;
  lessonQty: number;
  price: number;
  videoUrl: string;
  courseId: CourseId
}

@Injectable({
  providedIn: 'root'
})
export class CoursesPromoService {

  readonly coursePromo = signal<CoursePromoSummary[]>([
    {
      courseName: 'ორსულთა ონლაინ სკოლა',
      title: 'ვემზადებით მშობიარობისთვის',
      description: '9 ვიდეო გაკვეთილი ორსულობის და მშობიარობის შესახებ. 📌დამატებითი მასალა ფაილების სახით. 📌მუდმივი კავშირი ჩემთან-გამოცდილ მეან—გინეკოლოგთან-სადაც ამომწურავად აგიხსნით თქვენთვის საინტერესო საკითხებს. 📌ხშირად დასმული შეკითხვები და პასუხები.',
      lessonQty: 9,
      price: 120,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1',
      courseId: CourseId.PregnantOnline
  
    },
    {
      courseName: 'ორსულობისთვის მომზადება-გზამკვლევი',
      title: 'პრეგრავიდარული მომზადება-გზა ბედნიერი დედობისაკენ',
      description: 'ორსულობისთვის მომზადება ექიმთან ერთად : ონლაინ ლექციები..📍ვისთვის არის ეს ლექციები? 📍ეს ლექციები შენთვისაა: 📌თუ გეგმავ ორსულობას უახლოეს 3–12 თვეში 📌გინდა ექიმის მიერ მოწოდებული ინფორმაცია 📌 გსურს მშვიდად და გააზრებულად დაიწყო ორსულობა . ❌ ვებინარი არ არის მათთვის, ვინც უკვე ორსულად არის და ეძებს ორსულობის მართვის ინფორმაციას. 📝 რა შედის? სრული აღწერილობისთვის ეწვიეთ ჩემს ინსტაგრამ გვერდს ან მომწერეთ პირადში.',
      lessonQty: 1,
      price: 50,
      videoUrl: 'https://www.youtube.com/embed/y8Ja-m_4rHk?rel=0&modestbranding=1',
      courseId: CourseId.PregnantGoude
    }
  ]);

}
