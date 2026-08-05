import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './shared/guards/auth-.guard';
import { ContactService } from './features/contact/data-access/contact.service';


@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title}`);
    }
  }
}

export const titleResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot
) => route.routeConfig?.path?.replace('-', ' ') ?? '';

export const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        // canActivate: [authGuard],
        loadComponent: () => {
          return import('./features/home/home.component').then(
            (m) => m.HomeComponent
          );
        },
      },
      {
        path: 'about',
        // canActivate: [authGuard],
        loadComponent: () => {
          return import('./features/about/about.component').then(
            (m) => m.AboutComponent
          );
        },
      },
      {
        path: 'contact',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'courses-promo',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/courses-promo/courses-promo.component').then(
            (m) => m.CoursesPromoComponent
          ),
      },
      {
        path: 'purchase-course/:courseName/:sessionId',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/courses-promo/purchase-course/purchase-course.component').then(
            (m) => m.PurchaseCourseComponent
          ),
      },
      {
        path: 'shop',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/shop/shop.component').then(
            (m) => m.ShopComponent
          ),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/blog/blog.component').then(
            (m) => m.BlogComponent
          ),
      },
      {
        path: 'view-blog/:blogId',
        loadComponent: () =>
          import('./features/blog/view-blog/view-blog.component').then(
            (m) => m.ViewBlogComponent
          ),
      },
      {
        path: 'calendar',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/calendar/calendar.component').then(
            (m) => m.CalendarComponent
          ),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'my-courses',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./features/my-courses/my-courses.component').then(
            (m) => m.MyCoursesComponent
          ),
      },
      {
        path: 'courses',
        // canActivate: [authGuard],
        loadChildren: () => {
          return import('./features/my-courses/courses/courses.routers').then(
            (m) => m.routes
          );
        },
        // loadComponent: () =>
        //   import('./features/my-courses/courses/courses.component').then(
        //     (m) => m.CoursesComponent
        //   ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
