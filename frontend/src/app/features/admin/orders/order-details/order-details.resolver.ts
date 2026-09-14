import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminOrder, AdminOrdersService } from '../../data-access/admin-orders.service';

export const orderDetailsResolver: ResolveFn<AdminOrder | null> = (route) => {
  const ordersService = inject(AdminOrdersService);
  const id = Number(route.paramMap.get('id'));

  return ordersService.loadOrder(id);
};
