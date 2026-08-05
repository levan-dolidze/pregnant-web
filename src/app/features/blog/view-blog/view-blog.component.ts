import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogModel } from '../utils/model';
import { DateToStringPipe } from 'src/app/shared/pipe/date-to-string.pipe';

@Component({
  selector: 'app-view-blog',
  imports: [RouterLink, DateToStringPipe],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.scss',
})
export class ViewBlogComponent {

  @Input() blogId: string;

  @Input() blogById: BlogModel;

}
