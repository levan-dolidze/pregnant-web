import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, EventEmitter, inject, Input, input, OnDestroy, OnInit, output, Output, Signal, signal, ViewChild } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { SidePanelConfig } from './utils/sidepanel-config';
import { NumberToDecimalPipe } from 'src/app/shared/pipe/number-to-decimal.pipe';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { LoadingDirective } from 'src/app/components/loader/loading.directive';
import { CourseId } from 'src/app/shared/utils/enums';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';

export interface SubmitModel {
  form: any,
}
@Component({
  selector: 'lib-side-panel',
  imports: [ButtonComponent, NumberToDecimalPipe, NgClass, TranslocoModule, ReactiveFormsModule, NgClass, LoadingDirective, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-panel.html',
  styleUrl: './side-panel.scss',
})
export class SidePanel implements OnInit, AfterViewInit, OnDestroy {

  courseId = input<CourseId>();
  @Input() sidePanelConfig!: Signal<SidePanelConfig | any>; //temp
  @Output() submitEmit: EventEmitter<SubmitModel> = new EventEmitter();
  autoPayServiceCheckedChange = output<boolean>();


  private readonly cdr = inject(ChangeDetectorRef);
  private resizeObserver?: ResizeObserver;

  @ViewChild('contentTextRef') contentTextRef?: ElementRef<HTMLDivElement>;
  contentTextExpanded = signal(false);


  form = new FormGroup({
    termsChecked: new FormControl(false),
  })

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const el = this.contentTextRef?.nativeElement;
    if (!el) return;

    this.resizeObserver = new ResizeObserver(() => this.cdr.detectChanges());
    this.resizeObserver.observe(el);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  isContentTextOverflowing(): boolean {
    const el = this.contentTextRef?.nativeElement;
    return !!el && el.scrollHeight > (el.clientHeight + 5);
  }

  expandContentText(): void {
    this.contentTextExpanded.set(true);
  }

  onAutoPayServiceChecked(v: boolean) {
    this.autoPayServiceCheckedChange.emit(v);
  }



  onSubmit() {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
    }
    else {
      this.submitEmit.emit({ form: this.form.getRawValue() })
    }
  }

}
