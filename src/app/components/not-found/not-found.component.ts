import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<ng-content>
    <div class="not-found">
  <p class="not-found__title"></p>
</div>
  </ng-content>`,
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent { }
