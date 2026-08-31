import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GuidService } from 'src/app/shared/services/guid/guid.service';
import { PurchaseService } from './data-access/purchase.service';
import { VideoViewerComponent } from 'src/app/components/video-viewer/video-viewer.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CoursePromoSummary, CoursesPromoService } from './courses-promo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { iSAuthState } from 'src/app/auth/data-access/state/auth/auth-selectors';
import { MatDialog } from '@angular/material/dialog';
import { CourseNames } from './models/course-purchase.model';

@Component({
  selector: 'app-courses-promo',
  imports: [VideoViewerComponent, ButtonComponent],
  templateUrl: './courses-promo.component.html',
  styleUrl: './courses-promo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPromoComponent {
  private readonly router = inject(Router);
  private readonly guidService = inject(GuidService);
  private readonly purchaseService = inject(CoursesPromoService);
  private readonly dialog = inject(MatDialog);


  readonly store = inject(Store);
  readonly iSAuth = toSignal(this.store.select(iSAuthState))

  readonly promo = this.purchaseService.coursePromo;

  onPurchaseInit(course: CoursePromoSummary) {
    this.router.navigate(['/purchase-course/', course.courseId, this.guidService.getUUID])

    //???
    // if (this.iSAuth()) { 
    //   this.router.navigate(['/purchase-course/', this.guidService.getUUID])
    // }
    // else {
    //   this.dialog.open(AuthModalComponent, { width: '540px' });
    // }
  }

}
