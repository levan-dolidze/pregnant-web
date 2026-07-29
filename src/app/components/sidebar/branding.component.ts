
import { Component, OnInit, signal } from '@angular/core';
import { CoreService } from './core.service';

@Component({
  selector: 'app-branding',
  template: `
    <!-- <div class="branding">
      <a href="/">
        <img
          style="transition: width 0.3s ease, opacity 0.3s ease; "
          [src]="
          !options.sidenavCollapsed ?
          './assets/images/logos/horizontal-aldagi-logo-geo.png' :
          './assets/images/logos/logo-aldagi.png'
          "
          class="align-middle m-2"
          [width]="!options.sidenavCollapsed ? 133 : 40"
          height="40"
          alt="logo"
        />
      </a>
    </div> -->
  `,
})
export class BrandingComponent implements OnInit {

  constructor(private readonly settings: CoreService) { }


  options
  ngOnInit(): void {
    this.options = this.settings.options()

  }
  
}
