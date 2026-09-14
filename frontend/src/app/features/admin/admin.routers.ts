import { Routes } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { orderDetailsResolver } from './orders/order-details/order-details.resolver';

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
        resolve: { order: orderDetailsResolver },
        loadComponent: () =>
          import('./orders/order-details/order-details.component').then(
            (m) => m.OrderDetailsComponent
          ),
      },
    ],
  },
];
