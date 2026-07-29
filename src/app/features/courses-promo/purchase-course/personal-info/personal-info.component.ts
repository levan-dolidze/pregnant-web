import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, InputComponent, ButtonComponent, ValidationErrorsDirective],
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

  onNext(): void {

    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
    }
    else {

    }

  }
}
