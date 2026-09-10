import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-inline-message',
  template:`
  <ng-content></ng-content>
  `,
  styleUrl: './inline-message.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InlineMessage {}
