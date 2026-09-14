import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoModule } from '@jsverse/transloco';
import { AdminOrdersService } from '../../data-access/admin-orders.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { ItemNotFoundComponent } from 'src/app/components/item-not-found/item-not-found.component';
import { StatusLabelPipe } from 'src/app/shared/pipe/status-label.pipe';
import { OrderStatus } from 'src/app/shared/utils/enums';
import {
  ConfirmDialogModel,
  ConfirmDialogStandartComponent,
} from 'src/app/components/confirm-dialog-standart/confirm-dialog-standart.component';

@Component({
  selector: 'app-order-details',
  imports: [ButtonComponent, JsonPipe, DatePipe, RouterLink, LoadingDirective, ItemNotFoundComponent, StatusLabelPipe, TranslocoModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent {
  private readonly ordersService = inject(AdminOrdersService);
  private readonly dialog = inject(MatDialog);

  @Input() id!: string;

  // Populated by orderDetailsResolver before this component activates.
  readonly order = this.ordersService.selectedOrder;
  readonly loading = this.ordersService.loading;
  readonly OrderStatus = OrderStatus;

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
}
