import { Routes } from '@angular/router';
import { ErrorComponent } from './feature/error/error.component';


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorComponent,
      },
    ],
  },
];
