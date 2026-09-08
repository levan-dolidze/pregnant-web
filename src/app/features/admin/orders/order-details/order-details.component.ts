import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrdersService } from '../../data-access/admin-orders.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { OrderStatus } from 'src/app/shared/utils/enums';
import {
  ConfirmDialogModel,
  ConfirmDialogStandartComponent,
} from 'src/app/components/confirm-dialog-standart/confirm-dialog-standart.component';

@Component({
  selector: 'app-order-details',
  imports: [ButtonComponent, DatePipe, RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit {
  private readonly ordersService = inject(AdminOrdersService);
  private readonly dialog = inject(MatDialog);

  @Input() id!: string;

  readonly order = this.ordersService.selectedOrder;
  readonly loading = this.ordersService.loading;
  readonly OrderStatus = OrderStatus;

  ngOnInit(): void {
    this.ordersService.loadOrder(+this.id);
  }

  confirm(): void {
    this.openConfirmDialog({
      title: 'შეკვეთის დადასტურება',
      message: 'ნამდვილად გსურთ ამ შეკვეთის დადასტურება?',
      confirmBtn: 'დადასტურება',
      rejectBtn: 'გაუქმება',
    }, () => this.ordersService.confirmOrder(+this.id));
  }

  reject(): void {
    this.openConfirmDialog({
      title: 'შეკვეთის უარყოფა',
      message: 'ნამდვილად გსურთ ამ შეკვეთის უარყოფა?',
      confirmBtn: 'უარყოფა',
      rejectBtn: 'გაუქმება',
    }, () => this.ordersService.rejectOrder(+this.id));
  }

  private openConfirmDialog(data: Partial<ConfirmDialogModel>, onConfirm: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialogStandartComponent, {
      width: '420px',
      maxWidth: '95vw',
      data,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res?.result === 'confirm') {
        onConfirm();
      }
    });
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
}
