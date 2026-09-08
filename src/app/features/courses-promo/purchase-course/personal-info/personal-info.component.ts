import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { Store } from '@ngrx/store';
import { CoursePurchaseFlowActions } from '../../data-access/state/course-purchase-flow';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, InputComponent, ButtonComponent, ValidationErrorsDirective, TranslocoModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent {

  form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userLastName: new FormControl('', [Validators.required]),
  })
  @Output() next = new EventEmitter<void>();

  readonly store = inject(Store);


  onNext(): void {

    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
    }
    else {
      const { userName, userLastName } = this.form.getRawValue();

      
      this.store.dispatch(CoursePurchaseFlowActions.savePersonalInfo({
        personalInfo: { userName: userName, userLastName: userLastName },
        step: 2
      }));
    }

  }
}
