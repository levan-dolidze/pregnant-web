import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService, CourseSummary } from './courses/data-access/courses.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { OrderStatus } from 'src/app/shared/utils/enums';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/auth/data-access/state/auth/auth-selectors';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-my-courses',
  imports: [ButtonComponent,JsonPipe, LoadingDirective, TranslocoModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCoursesComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly coursesService = inject(CoursesService);
  private readonly translocoService = inject(TranslocoService);
  protected readonly store = inject(Store);

  readonly myCourses = this.coursesService.courseDescriptionState;
  readonly loading = this.coursesService.myOrdersLoading;
  readonly OrderStatus = OrderStatus;
  readonly selectUserId = toSignal(this.store.select(selectUserId))


  ngOnInit() {
  this.coursesService.getMyOrders(this.selectUserId())
}

  startLearning(course: CourseSummary): void {
    console.log(course)
    this.router.navigate(['/courses'], { queryParams: { courseId: course.courseId } })
  }

  goToCourses(): void {
    this.router.navigate(['/courses-promo']);
  }

  statusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Confirmed:
        return this.translocoService.translate('Order_Confirmed');
      case OrderStatus.Rejected:
        return this.translocoService.translate('Order_Rejected');
      default:
        return this.translocoService.translate('Order_Pending');
    }
  }
}
