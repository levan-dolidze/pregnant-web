import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent {

  form = new FormGroup({
    userName: new FormControl(),
    userLastName: new FormControl(),
  })
  @Output() next = new EventEmitter<void>();

  onNext(): void {

   if(this.form.invalid) {
     ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
   }
   else{

   }

  }
}
