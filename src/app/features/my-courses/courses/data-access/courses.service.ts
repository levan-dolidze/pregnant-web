import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CourseId } from 'src/app/shared/utils/enums';

export interface CourseSection {
  name: string;
}

export interface CourseChapter {
  chapter: string;
  sections: CourseSection[];
}

export class CoursesMenuSource {
  data: CourseChapter[]
  loader: boolean = true
}

const basePath = '/MyCourses';

export interface CourseLessonContent {
  chapter: string;
  section: string;
  url: string;
  title: string;
  duration: string;
  typeId: VideoTypeIds
}
export enum VideoTypeIds {
  VideoLession
}


export interface CourseSummary {
  title: string;
  description: string;
  chapterCount: number;
  videoCount: number;
  progress: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiService = inject(ApiService);
  destroyRef = inject(DestroyRef);

  coursesMenu = signal<CoursesMenuSource | null>(null);
  readonly coursesMenuState = computed(() => this.coursesMenu())
  coursesMenuLoading$ = this.getCoursesMenu()

  readonly chapters = computed(() => this.coursesMenu().data);
  readonly loading = computed(() => this.coursesMenu().loader);

  constructor() {
    this.coursesMenuLoading$.pipe(takeUntilDestroyed(this.destroyRef),
      finalize(() => this.coursesMenu.update((x) => ({ ...x, loader: false })))
    ).subscribe({
      next: (res) => {
        this.coursesMenu.update((x) => ({ data: res, loader: false }))
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  getCoursesMenu(courseId: CourseId = CourseId.Pregnant) {
    return this.apiService.get(`${basePath}/GetCoursesMenu?courseId=${courseId}`)
  }

  //getBy
  readonly courseBy = signal<CourseLessonContent>({
    chapter: 'intro',
    section: 'who_am_i',
    url: 'https://www.youtube.com/embed/QFcv5Ma8u8k',
    title: 'Dummy lesson title',
    duration: '1:20',
    typeId: VideoTypeIds.VideoLession
  });


  readonly courseDescription = signal<CourseSummary[]>([
    {
      title: 'მშობელთა სკოლა',
      description: 'კომპლექსური ვიდეო კურსი ორსულობის, მშობიარობისა და ახალშობილის მოვლის შესახებ.',
      chapterCount: 10,
      videoCount: 120,
      progress: 20,
    },
  ]);



}
