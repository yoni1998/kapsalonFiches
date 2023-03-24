import { Directive, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Directive({
  selector: '[appHideFormIfPathStartWithFormule]',
})
export class HideFormIfPathStartWithFormuleDirective implements OnInit {
  constructor(private location: Location, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.location.path().substring(0, 8) === '/formule') {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }
}
