import { NavItem } from "./nav-item/nav-item";
import { CoursesService } from "src/app/features/my-courses/courses/data-access/courses.service";


//end of the day it should be done into ngrx state
export function buildNavItems(chapters: CoursesService['arr']): NavItem[] {
  return chapters.map((chapter) => ({
    chapter: chapter.chapter,
    sections: chapter.sections.map((section, index) => ({
      name: section.name,
      route: `/courses/${chapter.chapter}/${index + 1}`,
    })),
  }));
}
