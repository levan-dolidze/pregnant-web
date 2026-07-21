import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private paramsSub = Subscription.EMPTY;

  chapterLabel: string | null = null;
  lessonLabel: string | null = null;

  ngOnInit(): void {
    this.paramsSub = this.route.paramMap.subscribe((params) => {
      this.chapterLabel = humanize(params.get('chapter'));
      this.lessonLabel = humanize(params.get('item'));
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}

function humanize(slug: string | null): string | null {
  return slug ? slug.replaceAll('-', ' ') : null;
}
