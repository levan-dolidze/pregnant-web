import { Injectable, signal } from '@angular/core';

export interface CourseSection {
  name: string;
}

export interface CourseChapter {
  chapter: string;
  sections: CourseSection[];
}

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


  //get
  arr: CourseChapter[] = [
    {
      chapter: 'intro',
      sections: [
        { name: 'who_am_i' },
        { name: 'what_you_will_learn' }
      ]
    },
    {
      chapter: 'childNutrition',
      sections: [
        { name: 'breastfeeding' },
        { name: 'bottle_feeding' }
      ]
    }
  ]

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
