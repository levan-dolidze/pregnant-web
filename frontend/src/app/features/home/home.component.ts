import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CoursesPromoService } from '../courses-promo/courses-promo.service';
import { CourseId } from 'src/app/shared/utils/enums';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';

interface ServiceCard {
  title: string;
  subtitle: string;
  action: string | null;
  accent?: boolean;
  courseId?: CourseId;
}

@Component({
  selector: 'app-home',
  imports: [TranslocoModule,LoadingDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly translocoService = inject(TranslocoService);

  private readonly purchaseService = inject(CoursesPromoService);
  readonly promo = this.purchaseService.coursePromo;
  readonly loading = this.purchaseService.loading;


  readonly servicesSection = computed(() => ({
    header: {
      badge: this.translocoService.translate('Our_Services'),
      title: this.translocoService.translate('Comprehensive_Pregnancy_Care'),
      subtitle: this.translocoService.translate('Services_Section_Subtitle'),
    },
    cards: this.promo().map((course): ServiceCard => ({
      title: course.courseName,
      subtitle: course.description,
      action: '/courses-promo',
      accent: true,
      courseId: course.courseId,
    })),
  }));

  goToCalendar(): void {
    this.router.navigate(['/calendar']);
  }

  navigate(path: string | null, courseId?: CourseId): void {
    if (!path) return;
    this.router.navigate([path], courseId ? { queryParams: { courseId } } : null);
  }
}
