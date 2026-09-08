import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CourseId, OrderStatus } from 'src/app/shared/utils/enums';
import { HttpErrorResponse } from '@angular/common/http';
import { selectUserId } from 'src/app/auth/data-access/state/auth/auth-selectors';
import { Store } from '@ngrx/store';

export interface CourseSection {
  name: string;
}

export interface CourseChapter {
  chapter: string;
  sections: CourseSection[];
}

export class CoursesMenuSource {
  data: CourseChapter[]
  loader: boolean = true
}

const basePath = '/MyCourses';

export interface CourseLessonContent {
  chapter: string;
  section: string;
  url: string;
  title: string;
  duration: string;
  typeId: VideoTypeIds
}

export class CourseLessonContentSource {
  data: CourseLessonContent
  loader: boolean = true
}

export interface MyCourseByRequest {
  chapter: string,
  section: string
}


export enum VideoTypeIds {
  VideoLession
}


export interface CourseSummary {
  orderId: number;
  title: string;
  description: string;
  lessonQty: number;
  status: OrderStatus;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiService = inject(ApiService);
  destroyRef = inject(DestroyRef);
  protected readonly store = inject(Store);

  coursesMenu = signal<CoursesMenuSource | null>(null);
  readonly coursesMenuState = computed(() => this.coursesMenu())
  coursesMenuLoading$ = this.getCoursesMenu()

  readonly chapters = computed(() => this.coursesMenu().data);
  readonly loading = computed(() => this.coursesMenu().loader);


  private myCourseBy = signal<CourseLessonContentSource | null>(null);
  readonly myCourseByState = computed(() => this.myCourseBy())

  readonly courseDescription = signal<CourseSummary[]>([]);
  readonly courseDescriptionState = computed(() => this.courseDescription())
  readonly myOrdersLoading = signal(true);

  constructor() {
    this.coursesMenuLoading$.pipe(takeUntilDestroyed(this.destroyRef),
      finalize(() => this.coursesMenu.update((x) => ({ ...x, loader: false })))
    ).subscribe({
      next: (res) => {
        this.coursesMenu.update((x) => ({ data: res, loader: false }))
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

   getMyOrders(userId: number): void {
    this.apiService.get(`${basePath}/GetMyOrders?id=${userId }`).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.myOrdersLoading.set(false))
    ).subscribe({
      next: (res: any[]) => {
        this.courseDescription.set(res.map((order) => ({
          orderId: order.orderId,
          title: order.courseName,
          description: order.description,
          lessonQty: order.lessonQty,
          status: order.status,
        })));
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }

  getCoursesMenu(courseId: CourseId = CourseId.PregnantOnline) {
    return this.apiService.get(`${basePath}/GetCoursesMenu?courseId=${courseId}`)
  }

  // CourseLessonContent
  getMyCourseBy(params: MyCourseByRequest) {
    this.apiService.get(`${basePath}/GetMyCourseBy`, params).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.myCourseBy.update((x) => ({ ...x, loader: false })))
    ).subscribe({
      next: (res) => {
        this.myCourseBy.update(() => ({ data: res, loader: false }))
      },
      error: (err:HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }

}
