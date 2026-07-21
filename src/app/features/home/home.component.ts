import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

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

  readonly servicesSection = signal({
    header: {
      badge: 'ჩვენი სერვისები',
      title: 'ყოვლისმომცველი მზრუნველობა ორსულობისას',
      subtitle: 'პირველი ტრიმესტრიდან მშობიარობის შემდგომ პერიოდამდე — ჩვენ თქვენს გვერდით ვართ ყოველ ნაბიჯზე.',
    },
    cards: [
      { logo: '💬', title: 'ონლაინ კონსულტაციები', subtitle: 'დისტანციური ვიზიტები არაგადაუდებელი კითხვებისა და დაკვირვებისთვის.', action: null },
      { logo: '🏥', title: 'მშობიარობა & მიღება', subtitle: 'სრული მხარდაჭერა მშობიარობის დროს თანამედროვე სამშობიაროებში.', action: null },
      { logo: '🏥', title: 'მშობელთა სკოლა', subtitle: 'ბავშვის მოვლის ვიდეო კრებული დედებისთვის', action: '/courses-promo', accent: true },
      { logo: '🛍️', title: 'პროდუქტები', subtitle: 'შერჩეული პროდუქტები ახალშობილთა მოვლისა და მშობიარობის შემდგომი პერიოდისთვის.', action: null, accent: true },
    ] as ServiceCard[],
  });

  goToCalendar(): void {
    this.router.navigate(['/calendar']);
  }

  navigate(path: string | null): void {
    if (path) this.router.navigate([path]);
  }
}
