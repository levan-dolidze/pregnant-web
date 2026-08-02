import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlogService } from './blog.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { DateToStringPipe } from 'src/app/shared/pipe/date-to-string.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [LoadingDirective, DateToStringPipe,JsonPipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BlogService],
})
export class BlogComponent {
  readonly blogService = inject(BlogService);
  readonly posts = this.blogService.blogList;
  readonly loading = this.blogService.loading;
}
