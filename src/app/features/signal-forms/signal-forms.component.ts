import { Component, signal } from '@angular/core';
import { apply, email, form, FormField, FormRoot, minLength, pattern, required, schema, Schema, submit } from '@angular/forms/signals';

import { SharedModule } from 'src/app/shared/shared-module/shared';
import { regExp } from 'src/app/shared/utils/regex';


export interface User {
  firstName: string,
  lastName: string,
  email: string,
  notifyByEmail: boolean
}

const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: 'required field' })

})
@Component({
  selector: 'app-signal-forms',
  imports: [SharedModule, FormField, FormRoot],
  templateUrl: './signal-forms.component.html',
  styleUrl: './signal-forms.component.scss',
})
export class SignalFormsComponent {


  constructor() {

    this.spread()
    this.rest('Alex', 'Elena', 'David', 'Maya',7)
  }


  rest(names,...teamMembers){

    console.log(names)
    console.log(teamMembers)

  }



  spread() {

    const arr = [1, 2, 3, 4];

    const newArr = [...arr, 5,6];
    console.log(newArr)
  }

  readonly user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    notifyByEmail: false
  })



  signupForm = form(this.user, (path) => {
    apply(path.firstName, nameSchema)
    apply(path.lastName, nameSchema),
      apply(path.lastName, nameSchema)

    //თუ notifyByEmail მონიშNულია მაშინ იყოს სავალდებულო
    required(path.email, {
      when: ({ valueOf }) => valueOf(path.notifyByEmail) === true
    })
    pattern(path.email, regExp.email),
      email(path.email, { message: "format is wrong" })
  }, {
    submission: {
      action: async (field) => {
        const data = await this.getData();
        console.log(data, field().value());
        return undefined;
      }
    }
  });






  async getData() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'levani'
  }

  async onSubmit() {
    await submit(this.signupForm)
  }

}
