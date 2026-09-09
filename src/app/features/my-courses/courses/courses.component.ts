import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { CoursesService } from './data-access/courses.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { TranslocoModule } from '@jsverse/transloco';
import { VideoViewerComponent } from 'src/app/components/video-viewer/video-viewer.component';
import { CourseId } from 'src/app/shared/utils/enums';

@Component({
  selector: 'app-courses',
  imports: [LoadingDirective, TranslocoModule, MatIconModule, VideoViewerComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnChanges, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesService = inject(CoursesService);

  readonly myCourseByState = this.coursesService.myCourseByState

  private readonly paramsSub = Subscription.EMPTY;

  @Input() section: string;
  @Input() chapter: string;
  @Input() courseId: CourseId;
  chapterLabel: string | null = null;
  lessonLabel: string | null = null;

  ngOnInit(): void {

    console.log(this.courseId)
  }

  ngOnChanges(changes: SimpleChanges): void {

    const params = {
      courseId: this.courseId || CourseId.PregnantOnline,
      chapter: this.chapter || 'intro',
      section: Number(this.section) || 1
    }
    this.coursesService.getMyCourseBy(params)
  }


  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}

function humanize(slug: string | null): string | null {
  return slug ? slug.replaceAll('-', ' ') : null;
}
