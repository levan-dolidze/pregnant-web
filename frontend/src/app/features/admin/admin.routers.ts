import { Routes } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';

export const routes: Routes = [
  {
    path: '',
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: 'admin',
        redirectTo: '/',
      },
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin-shell/admin-shell.component').then((m) => m.AdminShellComponent),
        children: [
          { path: '', redirectTo: 'orders', pathMatch: 'full' },
          {
            path: 'orders',
            loadComponent: () =>
              import('./orders/admin-orders.component').then((m) => m.AdminOrdersComponent),
          },
        ],
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./orders/order-details/order-details.component').then(
            (m) => m.OrderDetailsComponent
          ),
      },
    ],
  },
];
