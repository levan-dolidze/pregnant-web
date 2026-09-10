import { ValidatorFn } from "@angular/forms";
import { PatternTypes } from "src/app/shared/pipe/validationHelper.pipe";
import { IDropDown } from "src/app/shared/utils/iui-list-item";


export interface DynamicControl {
  showFileUpload: boolean
  sections: FormConfig[],
  formLevelValidators?: ValidatorFn[];
  formErrorMessages?: { errorKey: string; message: string }[];
  title: string
}

export class FormConfig {
  controlKey: string;
  formFieldType?: 'input' | 'text-area' | 'drop-down' | 'select' | 'file-upload' | 'input-picker' | 'range-picker' | 'picker' | 'radio'
  inputType?: "text" | "password" | "email" | "tel"
  label?: string;
  subPlaceholder?: string;
  defaultValue?: any;
  selectOptions?: IDropDown[];
  updateOn: 'change' | 'blur' | 'submit';
  validators?: ValidatorFn[];
  isRequired: boolean;
  isInvalid?: boolean;
  patternTypes: PatternTypes = 'none';
  getDropdownList?: IDropDown[];
  hideIf?: boolean;
  isDisabled?: boolean;
}
export interface ToggleBtn {
  controlKey: string,
  // groupList: GroupButtonModel[],
  // defaultValue?: GroupButtonModel
}