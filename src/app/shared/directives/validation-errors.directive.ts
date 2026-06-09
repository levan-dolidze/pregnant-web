import {
  AfterViewInit,
  Directive,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PatternTypes, ValidationHelper } from '../pipe/validationHelper.pipe';
import { TranslocoService } from '@jsverse/transloco';


export interface AdditionalValue {
  submit: boolean;
  patternTypes: PatternTypes;
}
@Directive({
  selector: '[validationErrors]',
  standalone: true,
})
export class ValidationErrorsDirective implements OnChanges, AfterViewInit {

  readonly container = inject(ViewContainerRef)
  readonly t = inject(TranslocoService)
  readonly template = inject(TemplateRef<unknown>)

  @Input() validationErrorsControl = '';
  @Input() validationErrorsLabel?: string;

  @Input('validationErrors')
  formGroup?: FormGroup;
  @Input() validationErrorsAdditionalValue?: AdditionalValue;

  ngAfterViewInit() {
    const formatter = new ValidationHelper(this.t)
    if (this.formGroup && this.validationErrorsControl) {
      setTimeout(() => {
        const control = this.formGroup?.get(this.validationErrorsControl);
        if (control) {
          control.statusChanges.subscribe(() => {
            if (this.container.length > 0) {
              this.container.clear();
            }
            if (control.dirty && control.invalid && control.errors) {
              this.createView(formatter, control);
            }
          });
        }
      }, 0);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const formatter = new ValidationHelper(this.t)
    if (changes?.['validationErrorsAdditionalValue']) {
      const submitted = changes?.['validationErrorsAdditionalValue']?.currentValue.submit;
      const control = this.formGroup?.get(this.validationErrorsControl);

      if (this.container.length > 0) {
        this.container.clear();
      }
      if (control && submitted) {
        this.createView(formatter, control);
      }
    }
  }

  private createView(formatter: ValidationHelper, control: AbstractControl) {
    const errors = formatter.format(
      control.errors,
      this.validationErrorsLabel ?? this.validationErrorsControl,
      this.validationErrorsAdditionalValue?.patternTypes
    );

    for (const err of errors) {
      this.container.createEmbeddedView(this.template, { $implicit: err });
    }
  }
}
