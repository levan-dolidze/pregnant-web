import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { CoursesPromoService } from '../courses-promo/courses-promo.service';

interface ServiceCard {
  logo: string;
  title: string;
  subtitle: string;
  action: string | null;
  accent?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly router = inject(Router);

  private readonly purchaseService = inject(CoursesPromoService);
  readonly promo = this.purchaseService.coursePromo;


  readonly servicesSection = computed(() => ({
    header: {
      badge: 'ჩვენი სერვისები',
      title: 'ყოვლისმომცველი მზრუნველობა ორსულობისას',
      subtitle: 'პირველი ტრიმესტრიდან მშობიარობის შემდგომ პერიოდამდე — ჩვენ თქვენს გვერდით ვართ ყოველ ნაბიჯზე.',
    },
    cards: this.promo().map((course): ServiceCard => ({
      logo: '🏥',
      title: course.courseName,
      subtitle: course.description,
      action: '/courses-promo',
      accent: true,
    })),
  }));

  goToCalendar(): void {
    this.router.navigate(['/calendar']);
  }

  navigate(path: string | null): void {
    if (path) this.router.navigate([path]);
  }
}
