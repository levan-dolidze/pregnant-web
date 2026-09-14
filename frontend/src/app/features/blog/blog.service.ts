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

  initialState = {
    data: null,
    loader: true
  }

  blogs = signal<BlogSource | null>(this.initialState);
  readonly blogsState = computed(() => this.blogs())
  blogsLoading$ = this.getBlogs();

  readonly blogList = computed(() => this.blogs()?.data);
  readonly loading = computed(() => this.blogs()?.loader);

  readonly blogDetailLoader = signal(false);

  constructor() {

    this.blogsLoading$.pipe(takeUntilDestroyed(this.destroyRef),
      finalize(() => this.blogs.update((x) => ({ ...x, loader: false })))
    ).subscribe({
      next: (res) => {
        this.blogs.update((x) => ({ data: res, loader: false }))
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getBlogs() {
    return this.apiService.get(`${basePath}/GetBlogs`)
  }

  getBlogById(blogId: string) {
    this.blogDetailLoader.set(true);
    return this.apiService.get(`${basePath}/GetBlogById/?BlogId=${blogId}`).pipe(
      finalize(() => this.blogDetailLoader.set(false))
    );
  }

}
