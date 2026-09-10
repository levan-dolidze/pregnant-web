import { ChangeDetectionStrategy, Component, EventEmitter, inject, Inject, Input, OnChanges, OnInit, Optional, Output, signal, SimpleChanges } from '@angular/core';
import { DynamicControl } from './dynamic-control.interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared-module/shared';
import { DatePicker } from '../date-picker/date-picker';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { MatHint } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Today } from 'src/app/shared/functions/dateModifyer';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';

export interface DynamicFormResponseModel {
  form: unknown,
  file: FileList[]
}

export interface FileUploadItem {
  file: File;
  fileType: number;
}

@Component({
  selector: 'app-dynamic-form',
  imports: [SharedModule, DatePicker, DropDownComponent, TextAreaComponent, MatHint],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  constructor(
    @Optional() public dialogRef: MatDialogRef<DynamicFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DynamicControl
  ) { }

  formModelConfig: DynamicControl;

  @Output() outputForm = new EventEmitter();
  @Output() toggleChangeEmit = new EventEmitter();
  @Output() radioChangeEmit = new EventEmitter();

  @Input() imageSrc: string;

  today = new Date(Today)


  formModel = new FormGroup({});

  // fileTypes = FileTypes;
  files = signal<FileList[]>([]);

  readonly fb = inject(FormBuilder)
  isLoading: boolean
  queryParamsMap: any


  form: FormGroup;

  radioList = signal([

    {
      id: 1,
      displayName: 'ლინკის არჩევა'
    },
    {
      id: 2,
      displayName: 'ლინკის ჩაწერა'
    }

  ])


  ngOnInit(): void {
    this.formModelConfig = this.data

    if (this.formModelConfig?.sections) {
      this.formModelConfig.sections.forEach((controlGroup) => {

        if (controlGroup.formFieldType === 'drop-down') {
          console.log(controlGroup?.defaultValue)
        }
        this.formModel.addControl(
          controlGroup.controlKey,
          new FormControl(controlGroup.formFieldType === 'drop-down'
            ? controlGroup?.defaultValue?.id : controlGroup?.defaultValue, {
            validators: controlGroup.validators || [],
            updateOn: controlGroup.updateOn || 'change',
          })
        );
      });
    }

    if (this.formModelConfig.formLevelValidators?.length) {
      this.formModel.addValidators(this.formModelConfig.formLevelValidators);
      this.formModel.updateValueAndValidity();
    }

    this.form = this.fb.group({
      startDate: [null],
      endDate: [null]
    });

  }



  onRadioChange(event: MatRadioButton) {
    this.radioChangeEmit.emit(MatRadioButton)
  }

  onStartChanged(date: unknown) {

  }


  onImageSelected(ev: any) {
    console.log(ev);
    this.files.update((items) => [...items, ...ev]);
  }


  onClose() {
    this.dialogRef.close();
  }


  onSubmit() {

    console.log(this.formModel)
    if (this.formModel.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.formModel);
    } else {
      console.log(this.formModel.value)
      console.log(this.files())
      const formResponse = {
        form: this.formModel.value,
        file: this.files()
      } as DynamicFormResponseModel

      console.log(formResponse)
      this.dialogRef.close(formResponse);
      this.outputForm.emit(structuredClone(this.formModel.value))
    }
  }

}
