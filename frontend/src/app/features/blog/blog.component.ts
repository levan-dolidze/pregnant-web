import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlogService } from './blog.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { DateToStringPipe } from 'src/app/shared/pipe/date-to-string.pipe';
import { JsonPipe } from '@angular/common';
import { BlogModel } from './utils/model';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LoaderService } from 'src/app/components/loader/loader.service';

@Component({
  selector: 'app-blog',
  imports: [LoadingDirective,JsonPipe, DateToStringPipe, TranslocoModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlogService],
})
export class BlogComponent {
  readonly blogService = inject(BlogService);
  readonly router = inject(Router);
  readonly loaderService = inject(LoaderService);
  readonly posts = this.blogService.blogList;
  readonly isLoadingState = this.loaderService.isLoadingState;


  onViewBlog(post: BlogModel) {
    this.router.navigate(['/view-blog', post.blogId]);  
  }
}
