import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { CoursesService } from './data-access/courses.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { TranslocoModule } from '@jsverse/transloco';
import { VideoViewerComponent } from 'src/app/components/video-viewer/video-viewer.component';

@Component({
  selector: 'app-courses',
  imports: [LoadingDirective, TranslocoModule, MatIconModule, VideoViewerComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit,OnChanges, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesService = inject(CoursesService);
  readonly courseBy = this.coursesService.courseBy

  private readonly paramsSub = Subscription.EMPTY;

  @Input() item:string;
  @Input() chapter:string;
  chapterLabel: string | null = null;
  lessonLabel: string | null = null;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
   
    console.log(this.chapter)
    console.log(this.item)
    //featch video by item id
  }


  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}

function humanize(slug: string | null): string | null {
  return slug ? slug.replaceAll('-', ' ') : null;
}
