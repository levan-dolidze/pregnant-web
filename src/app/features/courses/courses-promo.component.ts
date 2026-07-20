import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GuidService } from 'src/app/shared/services/guid/guid.service';

@Component({
  selector: 'app-courses-promo',
  imports: [],
  templateUrl: './courses-promo.component.html',
  styleUrl: './courses-promo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPromoComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly router = inject(Router);
  private readonly guidService = inject(GuidService);

  readonly videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1'
  );

  readonly course = {
    title: 'მშობელთა სკოლა',
    subtitle: 'ბავშვის მოვლის ვიდეო კრებული დედებისთვის',
    desc: 'კომპლექსური ვიდეო კურსი, რომელიც მოიცავს ორსულობის, მშობიარობისა და ახალშობილის მოვლის ყველა მნიშვნელოვან ასპექტს. Dr. თამარ თევზაძის ხელმძღვანელობით შეიძინეთ ცოდნა, რომელიც ნამდვილად გამოგადგებათ.',
    price: '₾149',
    modules: [
      { icon: '🤰', label: 'ორსულობის ეტაპები', desc: 'ტრიმესტრი ტრიმესტრის შემდეგ — რა იცვლება და რა უნდა იცოდეთ' },
      { icon: '🍼', label: 'ახალშობილის კვება', desc: 'ძუძუთი კვების სწორი ტექნიკა და ბოთლით კვების ალტერნატივა' },
      { icon: '🛁', label: 'ყოველდღიური მოვლა', desc: 'აბაზანა, ტუალეტი, კანის მოვლა — ნაბიჯ-ნაბიჯ სახელმძღვანელო' },
      { icon: '😴', label: 'ძილის რეჟიმი', desc: 'ჯანსაღი ძილის ჩვევების ჩამოყალიბება დედისთვის და ბავშვისთვის' },
      { icon: '🏥', label: 'პირველი სამედიცინო დახმარება', desc: 'გადაუდებელი სიტუაციები და სწრაფი რეაგირება' },
      { icon: '💆', label: 'პოსტნატალური მოვლა', desc: 'დედის ჯანმრთელობა და ემოციური კეთილდღეობა მშობიარობის შემდეგ' },
    ],
  };

  purchase(): void {
    // TODO: connect to payment flow
  }


  onPurchase() {
    this.router.navigate(['/purchase-pregnant-course/', this.guidService.getUUID])
  }

}
