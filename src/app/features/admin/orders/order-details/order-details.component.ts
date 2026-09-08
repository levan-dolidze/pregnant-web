import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { AdminOrdersService } from '../../data-access/admin-orders.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { OrderStatus } from 'src/app/shared/utils/enums';
import {
  ConfirmDialogModel,
  ConfirmDialogStandartComponent,
} from 'src/app/components/confirm-dialog-standart/confirm-dialog-standart.component';

@Component({
  selector: 'app-order-details',
  imports: [ButtonComponent, DatePipe, RouterLink, TranslocoModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit {
  private readonly ordersService = inject(AdminOrdersService);
  private readonly dialog = inject(MatDialog);
  private readonly translocoService = inject(TranslocoService);

  @Input() id!: string;

  readonly order = this.ordersService.selectedOrder;
  readonly loading = this.ordersService.loading;
  readonly OrderStatus = OrderStatus;

  ngOnInit(): void {
    this.ordersService.loadOrder(+this.id);
  }

  confirm(): void {
    this.openConfirmDialog({
      title: 'Confirm_Order_Title',
      message: 'Confirm_Order_Message',
      confirmBtn: 'Confirm',
      rejectBtn: 'Cancel',
    }, () => this.ordersService.confirmOrder(+this.id));
  }

  reject(): void {
    this.openConfirmDialog({
      title: 'Reject_Order_Title',
      message: 'Reject_Order_Message',
      confirmBtn: 'Reject',
      rejectBtn: 'Cancel',
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
        return this.translocoService.translate('Order_Confirmed');
      case OrderStatus.Rejected:
        return this.translocoService.translate('Order_Rejected');
      default:
        return this.translocoService.translate('Order_Pending');
    }
  }
}
