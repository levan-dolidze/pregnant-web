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
import { AlertService } from 'src/app/components/alert/alert.service';
import { TranslocoModule } from '@jsverse/transloco';
import { JsonPipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared-module/shared';


@Component({
  selector: 'app-contact',
  imports: [InputComponent, LoadingDirective, TextAreaComponent, LoadingDirective, ButtonComponent, ReactiveFormsModule, MatFormFieldModule, ValidationErrorsDirective, TranslocoModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [ContactService],

})
export class ContactComponent implements OnInit {



  readonly contactService = inject(ContactService);
  readonly alertService = inject(AlertService);
  readonly sendLoading = signal<boolean>(false);
  readonly sendLoadingState = computed(() => this.sendLoading());

  readonly contactInfoState = this.contactService.contactInfoState;
  readonly contactState = this.contactService.contact;
  readonly loading = this.contactService.laoding;

  readonly form = new FormGroup({
    // personalNumber: new FormControl('', [Validators.required, Validators.pattern(regExp.mobileGe)]),
    clientName: new FormControl('', [Validators.required]),
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
      }

      this.contactService.sendContactMessage(params).
        pipe(finalize(() => this.sendLoading.set(false))).
        subscribe({
          next: ((res) => {
            console.log(res)
            this.alertService.notification({ message: 'Successfully_Sent', messageType: 'success' })
          }),
          error: (() => {

          })
        })
    }
  }

}
