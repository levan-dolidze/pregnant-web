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

  private readonly pageSize = 20;
  private page = 1;

  readonly orders = signal<AdminOrder[]>([]);
  readonly selectedOrder = signal<AdminOrder | null>(null);
  readonly loading = signal(false);
  readonly hasMore = signal(true);

  loadOrders(): void {
    this.page = 1;
    this.orders.set([]);
    this.hasMore.set(true);
    this.loadPage();
  }

  loadMore(): void {
    if (this.loading() || !this.hasMore()) {
      return;
    }
    this.loadPage();
  }

  private loadPage(): void {
    this.loading.set(true);
    this.apiService.get(basePath, { page: this.page, pageSize: this.pageSize }).subscribe({
      next: (res: AdminOrder[]) => {
        this.orders.update((existing) => [...existing, ...res]);
        this.hasMore.set(res.length === this.pageSize);
        this.page++;
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
