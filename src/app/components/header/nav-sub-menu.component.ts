import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuLeaf } from './utils';

@Component({
  selector: 'app-nav-sub-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, RouterLink, RouterLinkActive, TranslocoModule],
  template: `
    <ng-container *transloco="let t">
      <button mat-menu-item class="topbar__sub-trigger" [matMenuTriggerFor]="subPanel">
        {{ t(label) }}
        <mat-icon class="topbar__sub-chevron">chevron_right</mat-icon>
      </button>
      <mat-menu #subPanel="matMenu" class="topbar__dropdown-panel">
        @for (child of children; track child.routerLink) {
          <a mat-menu-item
             [routerLink]="child.routerLink"
             routerLinkActive="topbar__dropdown-item--active">
            {{ t(child.name) }}
          </a>
        }
        @if (!children.length) {
          <span mat-menu-item disabled>–</span>
        }
      </mat-menu>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSubMenuComponent {
  @Input() label = '';
  @Input() children: MenuLeaf[] = [];
}
