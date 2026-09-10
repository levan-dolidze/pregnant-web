import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-shop',
  imports: [NotFoundComponent, TranslocoModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {}
