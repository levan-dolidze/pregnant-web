import { Directive, ElementRef, InjectionToken, Input, inject, AfterViewInit } from '@angular/core';

export const TruncateLimit = new InjectionToken<number>('TruncateLimit');

@Directive({
  selector: '[appTruncate]'
})
export class TruncateDirective implements AfterViewInit {

 
  @Input() limit = inject(TruncateLimit, {optional: true}) 
  private readonly elRef = inject(ElementRef);

  ngAfterViewInit() {
    const textContent = this.elRef.nativeElement.textContent.trim();

    if (this.limit && textContent.length > this.limit) {
      this.elRef.nativeElement.textContent = `${textContent.slice(0, this.limit)}...`;
    }
  }

}
