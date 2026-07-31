import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CoursePurchaseFlowActions, CoursePurchaseFlowSelectors } from '../../data-access/state/course-purchase-flow';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-confirm',
  imports: [ButtonComponent, TranslocoModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {

  private readonly store = inject(Store);

  @Input() courseName: string;

  readonly loading = toSignal(this.store.select(CoursePurchaseFlowSelectors.purchaseLoading));
  readonly error = toSignal(this.store.select(CoursePurchaseFlowSelectors.selectPurchaseError));


}
