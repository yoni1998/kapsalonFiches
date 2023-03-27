import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBiggerInput]',
})
export class BiggerInputDirective {
  constructor(private elementRef: ElementRef) {}
  @HostListener('click')
  click() {
    this.elementRef.nativeElement.style.minHeight = '8rem';
  }

  @HostListener('focusout')
  focus() {
    this.elementRef.nativeElement.style.minHeight = '2rem';
  }
}
