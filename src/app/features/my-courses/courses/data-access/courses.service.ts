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
  name: string;
  videoUrl: string;
  title: string;
  description: string;
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
        { name: 'who_am_i' },
        { name: 'what_you_will_learn' }
      ]
    }
  ]

  //getBy
  getCourseBy(chapter: string, section: string) {
    return signal<CourseLessonContent>({
      chapter,
      section,
      name: section,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'Dummy lesson title',
      description: 'Dummy lesson description.',
    });
  }

  getCourseDescription(courseId: string) {
    return signal<CourseSummary[]>([
      {
        title: 'მშობელთა სკოლა',
        description: 'კომპლექსური ვიდეო კურსი ორსულობის, მშობიარობისა და ახალშობილის მოვლის შესახებ.',
        chapterCount: 10,
        videoCount: 120,
        progress: 20,
      },
    ]
  );
  }

}
