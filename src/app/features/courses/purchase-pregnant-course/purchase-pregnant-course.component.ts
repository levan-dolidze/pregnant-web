import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { regExp } from 'src/app/shared/utils/regex';
import { PurchaseService } from '../data-access/purchase.service';
import type { CoursePurchaseRequest } from '../models/course-purchase.model';

@Component({
  selector: 'app-purchase-pregnant-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    InputComponent,
    ButtonComponent,
    ValidationErrorsDirective,
  ],
  templateUrl: './purchase-pregnant-course.component.html',
  styleUrl: './purchase-pregnant-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasePregnantCourseComponent {

  private readonly purchaseService = inject(PurchaseService)


  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    mob: new FormControl('', [Validators.required, Validators.pattern(regExp.onlyNumbers)]),
    email: new FormControl('', [Validators.required, Validators.pattern(regExp.email)]),
  });

  onPay(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);

    } else {

      const params = this.form.getRawValue();

      this.purchaseService.pay(params).subscribe({
        next: (() => {

        }),
        error: (() => {

        })
      })



    }
  }
}
