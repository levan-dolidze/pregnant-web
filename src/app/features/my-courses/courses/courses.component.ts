import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [JsonPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit,OnChanges, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private paramsSub = Subscription.EMPTY;

  @Input() item:string;
  @Input() chapter:string;
  chapterLabel: string | null = null;
  lessonLabel: string | null = null;

  ngOnInit(): void {

    // this.paramsSub = this.route.paramMap.subscribe((params) => {
    //   this.chapterLabel = humanize(params.get('chapter'));
    //   this.lessonLabel = humanize(params.get('item'));
    // });
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
