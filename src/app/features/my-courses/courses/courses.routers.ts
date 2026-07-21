import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';

export const titleResolver: ResolveFn<string> = (
    route: ActivatedRouteSnapshot
) => route.routeConfig?.path?.replace('-', ' ') ?? '';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('src/app/components/sidebar/full.component').then(
                (m) => m.FullComponent
            ),
        children: [
            {
                path: '',
                pathMatch: 'full',
                data: {
                    mode: 'კურსები',
                },
                title: titleResolver,
                loadComponent: () =>
                    import('./courses.component').then(
                        (m) => m.CoursesComponent
                    ),
            },
            {
                path: ':chapter/:item',
                data: {
                    mode: 'კურსები',
                },
                title: titleResolver,
                loadComponent: () =>
                    import('./courses.component').then(
                        (m) => m.CoursesComponent
                    ),
            },
        ],
    },

];
