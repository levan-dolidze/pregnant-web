import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class AdminOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ordersService = inject(AdminOrdersService);
  private observer?: IntersectionObserver;

  @ViewChild('sentinel') sentinelRef?: ElementRef<HTMLDivElement>;

  readonly orders = this.ordersService.orders;
  readonly loading = this.ordersService.loading;
  readonly hasMore = this.ordersService.hasMore;
  readonly OrderStatus = OrderStatus;

  ngOnInit(): void {
    this.ordersService.loadOrders();
  }

  ngAfterViewInit(): void {
    const el = this.sentinelRef?.nativeElement;
    if (!el) {
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.ordersService.loadMore();
      }
    });
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
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
