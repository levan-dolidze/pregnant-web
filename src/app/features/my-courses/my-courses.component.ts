import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService, CourseSummary } from './courses/data-access/courses.service';
import { ButtonComponent } from 'src/app/components/button/button.component';

@Component({
  selector: 'app-my-courses',
  imports: [ButtonComponent],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCoursesComponent {

  private readonly router = inject(Router);
  private readonly coursesService = inject(CoursesService);

  readonly myCourses = this.coursesService.courseDescription;

  startLearning(course: CourseSummary): void {
    // TODO: navigate to the course player once it exists
    this.router.navigate(['/courses'])

  }
}
