import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GuidService } from 'src/app/shared/services/guid/guid.service';
import { PurchaseService } from './data-access/purchase.service';
import { VideoViewerComponent } from 'src/app/components/video-viewer/video-viewer.component';

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
  private readonly purchaseService = inject(PurchaseService);

  readonly videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1';
  readonly promo = this.purchaseService.coursePromo;

  onPurchase() {
    this.router.navigate(['/purchase-pregnant-course/', this.guidService.getUUID])
  }

}
