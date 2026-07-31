import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { TextAreaComponent } from 'src/app/components/text-area/text-area.component';
import { ContactService } from './data-access/contact.service';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { regExp } from 'src/app/shared/utils/regex';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-contact',
  imports: [InputComponent, TextAreaComponent, LoadingDirective, ButtonComponent, ReactiveFormsModule, MatFormFieldModule, ValidationErrorsDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [ContactService],

})
export class ContactComponent implements OnInit {



  readonly contactService = inject(ContactService);
  readonly sendLoading = signal<boolean>(false);
  readonly sendLoadingState = computed(() => this.sendLoading());

  readonly contactInfoState = this.contactService.contactInfoState;
  readonly contactState = this.contactService.contact;
  readonly loading = this.contactService.laoding;

  readonly form = new FormGroup({
    // personalNumber: new FormControl('', [Validators.required, Validators.pattern(regExp.mobileGe)]),
    mobileNumber: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {



  }



  onSend(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
    } else {

      this.sendLoading.set(true)
      const params = {
        ...this.form.getRawValue(),
        personalNumber: "01010101010"
      }

      this.contactService.sendContactMessage(params).
        pipe(finalize(() => this.sendLoading.set(false))).
        subscribe({
          next: ((res) => {
            console.log(res)
          }),
          error: (() => {

          })
        })
    }
  }

}
