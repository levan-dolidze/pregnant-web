import { ChangeDetectionStrategy, Component } from '@angular/core';

interface BlogPost {
  id: number;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
  readonly posts: BlogPost[] = [
    {
      id: 1,
      author: 'Dr. თამარ თევზაძე',
      date: '20 იან 2025',
      title: 'ორსულობის პირველი ტრიმესტრი: რა უნდა იცოდეთ',
      excerpt: 'პირველი ტრიმესტრი ორსულობის ყველაზე კრიტიკული პერიოდია. გაიგეთ, რა ცვლილებები ელით და როგორ გაიაროთ ეს ეტაპი ყველაზე კომფორტულად.',
      image: 'assets/images/doctor/blog.jpg',
      tags: ['ორსულობა', 'ჯანმრთელობა', 'რჩევები']
    },
    {
      id: 2,
      author: 'Dr. თამარ თევზაძე',
      date: '15 იან 2025',
      title: 'გესტაციური დიაბეტი: სიმპტომები და მართვა',
      excerpt: 'გესტაციური დიაბეტი ორსულობის ერთ-ერთი გავრცელებული გართულებაა. ადრეული დიაგნოსტიკა და სწორი მკურნალობა უზრუნველყოფს ჯანსაღ მშობიარობას.',
      image: 'assets/images/doctor/blog.jpg',
      tags: ['დიაბეტი', 'მაღალი რისკი', 'ჯანმრთელობა']
    },
    {
      id: 3,
      author: 'Dr. თამარ თევზაძე',
      date: '10 იან 2025',
      title: 'პოსტნატალური მოვლა: ახალშობილთან ერთად პირველი კვირები',
      excerpt: 'მშობიარობის შემდგომი პერიოდი ისეთივე მნიშვნელოვანია, როგორც ორსულობა. გაიგეთ, სად მიიღოთ სწორი მხარდაჭერა და რა ნიშნებს მიაქციოთ ყურადღება.',
      image: 'assets/images/doctor/blog.jpg',
      tags: ['პოსტნატალური', 'ახალშობილი', 'დედობა']
    },
  ];
}
