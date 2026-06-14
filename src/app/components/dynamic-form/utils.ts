import { ValidatorFn } from "@angular/forms";
import { FormConfig } from "./dynamic-control.interfaces";


export interface DynamicControl {
    showFileUpload: boolean
    sections: FormConfig[],
    formLevelValidators?: ValidatorFn[];
    formErrorMessages?: { errorKey: string; message: string }[];
}