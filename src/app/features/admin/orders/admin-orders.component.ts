import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminOrdersService } from '../data-access/admin-orders.service';
import { OrderStatus } from 'src/app/shared/utils/enums';

@Component({
  selector: 'app-admin-orders',
  imports: [RouterLink],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrdersComponent implements OnInit {
  private readonly ordersService = inject(AdminOrdersService);

  readonly orders = this.ordersService.orders;
  readonly loading = this.ordersService.loading;
  readonly OrderStatus = OrderStatus;

  ngOnInit(): void {
    this.ordersService.loadOrders();
  }

  statusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Confirmed:
        return 'დადასტურებული';
      case OrderStatus.Rejected:
        return 'უარყოფილი';
      default:
        return 'მოლოდინში';
    }
  }

  statusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Confirmed:
        return 'admin-orders__status--confirmed';
      case OrderStatus.Rejected:
        return 'admin-orders__status--rejected';
      default:
        return 'admin-orders__status--pending';
    }
  }
}
