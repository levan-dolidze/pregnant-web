import { computed, Signal } from "@angular/core";
import { NavItem } from "./nav-item/nav-item";
import { CourseChapter } from "src/app/features/my-courses/courses/data-access/courses.service";


//end of the day it should be done into ngrx state
export function buildNavItems(chapters: Signal<CourseChapter[]>) {
  return computed<NavItem[]>(() =>
    (chapters() ?? []).map((chapter) => ({
      chapter: chapter.chapter,
      sections: chapter.sections.map((section, index) => ({
        name: section.name,
        route: `/courses/${chapter.chapter}/${index + 1}`,
      })),
    }))
  );
}
