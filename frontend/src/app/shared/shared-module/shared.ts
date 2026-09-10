import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgComponentOutlet,
  NgOptimizedImage,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { MaterialModule } from './material.module';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ValidationHelper } from '../pipe/validationHelper.pipe';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { DropDownComponent } from '../../components/drop-down/drop-down.component';
import { ValidationErrorsDirective } from '../directives/validation-errors.directive';
import { TruncateDirective } from '../directives/truncate.directive';
import { SymbolParsePipe } from '../pipe/symbol-parse.pipe';
import { DatePicker } from 'src/app/components/date-picker/date-picker';
import { RepeatDirective } from '../directives/repeat.directive';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { Loader } from 'src/app/components/loader/loader';

@NgModule({
  imports: [
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    NgComponentOutlet,
    NgOptimizedImage,
    CommonModule,
    MaterialModule,
    InputComponent,
    ButtonComponent,
    DatePicker,
    ValidationHelper,
    ValidationErrorsDirective,
    CheckboxComponent,
    DropDownComponent,
    TruncateDirective,
    LoadingDirective,
    Loader,
    SymbolParsePipe,
    RepeatDirective
  ],

  exports: [
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgComponentOutlet,
    NgOptimizedImage,
    MaterialModule,
    InputComponent,
    ButtonComponent,
    DatePicker,
    ValidationHelper,
    ValidationErrorsDirective,
    CheckboxComponent,
    DropDownComponent,
    TruncateDirective,
    AsyncPipe,
    LoadingDirective,
    Loader,
    SymbolParsePipe,
    RepeatDirective
  ],

  providers: [
  ],
  declarations: [],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
    };
  }
}
