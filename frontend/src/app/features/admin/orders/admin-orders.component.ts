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
import { TranslocoModule } from '@jsverse/transloco';
import { AdminOrdersService } from '../data-access/admin-orders.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { StatusLabelPipe } from 'src/app/shared/pipe/status-label.pipe';
import { OrderStatus } from 'src/app/shared/utils/enums';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [RouterLink,NgClass, LoadingDirective, StatusLabelPipe, TranslocoModule, NgClass],
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
  orderStatus = OrderStatus

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
}
