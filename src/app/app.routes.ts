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
        loadComponent: () => {
          return import('./features/home/home.component').then(
            (m) => m.HomeComponent
          );
        },
      },
      {
        path: 'about',
        loadComponent: () => {
          return import('./features/about/about.component').then(
            (m) => m.AboutComponent
          );
        },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/services.component').then(
            (m) => m.ServicesComponent
          ),
      },
      {
        path: 'shop',
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
        path: 'calendar',
        loadComponent: () =>
          import('./features/calendar/calendar.component').then(
            (m) => m.CalendarComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
