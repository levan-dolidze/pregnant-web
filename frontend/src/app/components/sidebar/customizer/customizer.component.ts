import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
  signal,
  inject,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { MaterialModule } from 'src/app/shared/shared-module/material.module';
import { AppSettings } from '../../layout/utils/config';
import { CoreService } from '../core.service';

@Component({
    selector: 'app-customizer',
    imports: [
        MaterialModule,
        FormsModule,
        TranslocoModule
    ],
    templateUrl: './customizer.component.html',
    styleUrls: ['./customizer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomizerComponent {
  @Output() optionsChange = new EventEmitter<AppSettings>();
  hideSingleSelectionIndicator = signal(true);

  settings = inject(CoreService)
  options = this.settings.options()

  setDark() {
    this.optionsChange.emit(this.options);
    this.settings.setActiveMode(this.options.theme)
  }

  setColor() {
    this.optionsChange.emit(this.options);
  }

  setDir() {
    // this.optionsChange.emit(this.options);
  }

  setSidebar() {
    // this.optionsChange.emit(this.options);
  }
}
