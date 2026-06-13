import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-about',
  imports: [ButtonComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private readonly router = inject(Router);

  goToCalendar(): void {
    this.router.navigate(['/calendar']);
  }
}
