import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavItem } from './nav-item';

@Component({
  selector: 'app-nav-item',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
})
export class AppNavItemComponent {
  @Input({ required: true }) item!: NavItem;
  @Output() notify = new EventEmitter<void>();

  readonly expanded = signal(false);

  toggle(): void {
    this.expanded.update((value) => !value);
  }

  onLessonClick(): void {
    if (globalThis.innerWidth < 1024) {
      this.notify.emit();
    }
  }
}
