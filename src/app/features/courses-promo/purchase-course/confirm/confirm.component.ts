import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button/button.component';

@Component({
  selector: 'app-confirm',
  imports: [ButtonComponent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
}
