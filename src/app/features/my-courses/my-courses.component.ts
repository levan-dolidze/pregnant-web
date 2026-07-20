import { ChangeDetectionStrategy, Component } from '@angular/core';

interface MyCourse {
  title: string;
  description: string;
  progress: number;
  chapters: number;
  videos: number;
}

@Component({
  selector: 'app-my-courses',
  imports: [],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCoursesComponent {
  readonly courses: MyCourse[] = [
    {
      title: 'მშობელთა სკოლა',
      description: 'კომპლექსური ვიდეო კურსი ორსულობის, მშობიარობისა და ახალშობილის მოვლის შესახებ.',
      progress: 20,
      chapters: 10,
      videos: 120,
    },
  ];

  startLearning(course: MyCourse): void {
    // TODO: navigate to the course player once it exists
  }
}
