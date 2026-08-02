import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { BlogSource } from './utils/model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

const basePath = '/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private readonly apiService = inject(ApiService);
  destroyRef = inject(DestroyRef);

  blogs = signal<BlogSource | null>(null);
  readonly blogsState = computed(() => this.blogs())
  blogsLoading$ = this.getBlogs()

  readonly blogList = computed(() => this.blogs().data);
  readonly loading = computed(() => this.blogs().loader);

  constructor() {
    this.blogsLoading$.pipe(takeUntilDestroyed(this.destroyRef),
      finalize(() => this.blogs.update((x) => ({ ...x, loader: false })))
    ).subscribe({
      next: (res) => {
        this.blogs.update((x) => ({ data: res, loader: false }))
      },

      error: (err: any) => {
        console.error(err);
      },

    });
  }

  getBlogs() {
    return this.apiService.get(`${basePath}/GetBlogs`)
  }

}
