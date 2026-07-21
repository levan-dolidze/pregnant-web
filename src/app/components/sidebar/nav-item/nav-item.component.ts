import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/shared-module/material.module';
import { SharedModule } from 'src/app/shared/shared-module/shared';

@Component({
    selector: 'app-nav-item',
    imports: [SharedModule, MaterialModule, CommonModule],
    templateUrl: './nav-item.component.html',
    styleUrl: './nav-item.component.scss',
    animations: [
        trigger('indicatorRotate', [
            state('collapsed', style({ transform: 'rotate(0deg)' })),
            state('expanded', style({ transform: 'rotate(180deg)' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ]),
    ]
})
export class AppNavItemComponent implements OnChanges {
  @Output() toggleMobileLink: any = new EventEmitter<void>();
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  expanded: any = false;
  disabled: any = false;
  twoLines: any = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem | any;
  @Input() depth: any;
  @Input() sidenavCollapsed!: boolean;

  constructor(public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    // this.navService.currentUrl.subscribe((url: string) => {
    //   if (this.item.route && url) {
    //     // console.log(`Checking '/${this.item.route}' against '${url}'`);
    //     this.expanded = url.indexOf(`/${this.item.route}`) === 0;
    //     this.ariaExpanded = this.expanded;
    //   }
    // });
  console.log('expanded:', this.sidenavCollapsed);
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
    //scroll
    globalThis.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (!this.expanded){
    if (globalThis.innerWidth < 1024) {
      this.notify.emit();
    }
  }
  }

  onSubItemSelected(item: NavItem) {
    if (!item.children || !item.children.length){
      if (this.expanded && globalThis.innerWidth < 1024) {
        this.notify.emit();
      }
    }
  }
}
