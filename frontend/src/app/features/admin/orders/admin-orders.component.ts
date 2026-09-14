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
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { AdminOrdersService } from '../data-access/admin-orders.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { OrderStatus } from 'src/app/shared/utils/enums';

@Component({
  selector: 'app-admin-orders',
  imports: [RouterLink, LoadingDirective, TranslocoModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ordersService = inject(AdminOrdersService);
  private readonly translocoService = inject(TranslocoService);
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


  statusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Confirmed:
        return this.translocoService.translate('Order_Confirmed');
      case OrderStatus.Rejected:
        return this.translocoService.translate('Order_Rejected');
      default:
        return this.translocoService.translate('Order_Pending');
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

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
