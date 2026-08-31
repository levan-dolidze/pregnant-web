import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CourseId } from 'src/app/shared/utils/enums';

const basePath = '/Products';

export interface CoursePromoSummary {
  courseName: string;
  title: string;
  description: string;
  lessonQty: number;
  price: number;
  videoUrl: string;
  courseId: CourseId
}

export class CoursePromoSource {
  data: CoursePromoSummary[]
  loader: boolean = true
}

@Injectable({
  providedIn: 'root'
})
export class CoursesPromoService {

  private readonly apiService = inject(ApiService);
  destroyRef = inject(DestroyRef);

  promos = signal<CoursePromoSource | null>(null);
  readonly promosState = computed(() => this.promos())
  promosLoading$ = this.getPromo()

  readonly coursePromo = computed(() => this.promos()?.data ?? []);
  readonly loading = computed(() => this.promos()?.loader);

  constructor() {
    this.promosLoading$.pipe(takeUntilDestroyed(this.destroyRef),
      finalize(() => this.promos.update((x) => ({ ...x, loader: false })))
    ).subscribe({
      next: (res) => {
        this.promos.update((x) => ({ data: res, loader: false }))
      },

      error: (err: any) => {
        console.error(err);
      },

    });
  }

  getPromo() {
    return this.apiService.get(`${basePath}/GetPromo`)
  }

}
