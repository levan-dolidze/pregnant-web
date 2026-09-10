import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoFormatDate]'
})
export class AutoFormatDateDirective {
  constructor(private readonly el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^\d]/g, '');

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length > 1 && value.indexOf('/') === -1) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    if (value.length > 4 && value.indexOf('/', 3) === -1) {
      value = `${value.slice(0, 5)}/${value.slice(5)}`;
    }
    input.value = value;

    if (input.value) {
      input.id = '';
    } else {
      input.id = 'hint';
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;

    if (event.key === 'Backspace' || event.key === 'Delete') {
      let value = input.value;

      if (value.endsWith('/')) {
        value = value.slice(0, -1);
      }

      input.value = value;

      if (!input.value) {
        input.id = 'hint';
      } else {
        input.id = '';
      }
    }
  }
}
