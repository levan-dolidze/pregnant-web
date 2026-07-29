import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, InputComponent, ButtonComponent, ValidationErrorsDirective, OtpComponent],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {

  @Input() form!: FormGroup;
  @Output() confirmOtpEmit = new EventEmitter<boolean>();

  onNext(): void {
    const controls = ['mobileNumber', 'email'];

    if (controls.some(name => this.form.get(name)?.invalid)) {
      controls.forEach(name => this.form.get(name)?.markAsDirty());
      return;
    }

  }
}
