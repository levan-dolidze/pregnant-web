import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from 'src/app/core/api-service/api.service';
import { CourseId, OrderStatus } from 'src/app/shared/utils/enums';

export interface AdminOrder {
  id: number;
  sessionId: string;
  userName: string;
  userLastName: string;
  email: string;
  mobileNumber: string;
  productId: CourseId;
  paymentUrl: string;
  userId: number | null;
  status: OrderStatus;
  createdAt: string;
}

const basePath = '/AdminOrders';

@Injectable({
  providedIn: 'root',
})
export class AdminOrdersService {
  private readonly apiService = inject(ApiService);

  readonly orders = signal<AdminOrder[]>([]);
  readonly selectedOrder = signal<AdminOrder | null>(null);
  readonly loading = signal(false);

  loadOrders(): void {
    this.loading.set(true);
    this.apiService.get(basePath).subscribe({
      next: (res: AdminOrder[]) => {
        this.orders.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  loadOrder(id: number): void {
    this.loading.set(true);
    this.apiService.get(`${basePath}/${id}`).subscribe({
      next: (res: AdminOrder) => {
        this.selectedOrder.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  confirmOrder(id: number): void {
    this.apiService.post(`${basePath}/${id}/confirm`).subscribe({
      next: (res: AdminOrder) => this.selectedOrder.set(res),
      error: (err) => console.error(err),
    });
  }

  rejectOrder(id: number): void {
    this.apiService.post(`${basePath}/${id}/reject`).subscribe({
      next: (res: AdminOrder) => this.selectedOrder.set(res),
      error: (err) => console.error(err),
    });
  }
}
