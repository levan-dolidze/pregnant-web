import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GuidService } from 'src/app/shared/services/guid/guid.service';
import { PurchaseService } from './data-access/purchase.service';
import { VideoViewerComponent } from 'src/app/components/video-viewer/video-viewer.component';
import { CoursesPromoService } from './courses-promo.service';

@Component({
  selector: 'app-courses-promo',
  imports: [VideoViewerComponent],
  templateUrl: './courses-promo.component.html',
  styleUrl: './courses-promo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPromoComponent {
  private readonly router = inject(Router);
  private readonly guidService = inject(GuidService);
  private readonly purchaseService = inject(CoursesPromoService);

  readonly promo = this.purchaseService.coursePromo;

  onPurchaseInit() {
    this.router.navigate(['/purchase-pregnant-course/', this.guidService.getUUID])
  }

}
