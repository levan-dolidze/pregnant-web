import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { OrderStatus } from '../utils/enums';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {
  private readonly translocoService = inject(TranslocoService);

  transform(status: OrderStatus): string {
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
