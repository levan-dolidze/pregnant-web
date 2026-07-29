import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';
// import { form } from '@angular/forms/signals';


export interface ContactInfo {
  mobileNumber: string;
  email: string;
}

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, OtpComponent],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {

  form = new FormGroup({
    mobileNumber: new FormControl(),
    email: new FormControl(),
  })

  // contactInfoModel = signal<ContactInfo>({
  //   mobileNumber: '',
  //   email: ''
  // });

  // form = form(this.contactInfoModel);

  @Output() confirmOtpEmit = new EventEmitter<boolean>();

  onNext(): void {
  }
}
