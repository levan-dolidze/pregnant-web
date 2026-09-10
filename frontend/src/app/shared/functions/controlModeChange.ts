import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class ControlModeChange {
  static formFieldsModeControl(mode: string, form: FormGroup) {
    for (const fields of Object.keys(form.controls)) {
       const controls = form.get(fields)
      controls[mode]({ onlySelf: true })
    }
  };
};


export class HandleFormValidation {
  static handleCreateFormInvalid(form: FormGroup): boolean {
    let isError = false;

    const markControls = (controls) => {
      for (const key in controls) {
        const control = controls[key];

        if (control instanceof FormControl) {
          control.markAsDirty();
        }
        else if (control instanceof FormGroup) {
          markControls(control.controls);
        }

        else if (control instanceof FormArray) {
          for (const c of control.controls) {
            if (c instanceof FormGroup) {
              markControls(c.controls);
            } else if (c instanceof FormControl) {
              c.markAsDirty();
            }
          }
        }
      }
    };

    markControls(form.controls);

    if (form.invalid) {
      isError = true;
    }
    return isError;
  }
}

