import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslocoModule],

  template:`
  <main class="admin-shell" *transloco="let t">
  <nav class="admin-shell__tabs">
    <a class="admin-shell__tab"
       routerLink="orders"
       routerLinkActive="admin-shell__tab--active">
      {{ t('Orders') }}
    </a>
  </nav>

  <router-outlet></router-outlet>
</main>`,
  styleUrl: './admin-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminShellComponent {
}
