import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService, CourseSummary } from './courses/data-access/courses.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { OrderStatus } from 'src/app/shared/utils/enums';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/auth/data-access/state/auth/auth-selectors';

@Component({
  selector: 'app-my-courses',
  imports: [ButtonComponent, LoadingDirective],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCoursesComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly coursesService = inject(CoursesService);
  protected readonly store = inject(Store);

  readonly myCourses = this.coursesService.courseDescriptionState;
  readonly loading = this.coursesService.myOrdersLoading;
  readonly OrderStatus = OrderStatus;
  readonly selectUserId = toSignal(this.store.select(selectUserId))


  ngOnInit() {
  this.coursesService.getMyOrders(this.selectUserId())
}

  startLearning(course: CourseSummary): void {
    // TODO: navigate to the course player once it exists
    this.router.navigate(['/courses'])

  }

  goToCourses(): void {
    this.router.navigate(['/courses-promo']);
  }

  statusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Confirmed:
        return 'დადასტურებული';
      case OrderStatus.Rejected:
        return 'უარყოფილი';
      default:
        return 'ელდოება დასტურს';
    }
  }
}
