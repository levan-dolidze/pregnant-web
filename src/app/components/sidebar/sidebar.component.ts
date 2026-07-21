import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BrandingComponent } from './branding.component';
import { MaterialModule } from 'src/app/shared/shared-module/material.module';

@Component({
    selector: 'app-sidebar',
    imports: [BrandingComponent, MaterialModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  constructor() { }
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();


  ngOnInit(): void { }


}