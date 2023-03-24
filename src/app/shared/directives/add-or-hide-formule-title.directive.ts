import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Directive({
  selector: '[appAddOrHideFormuleTitle]',
})
export class AddOrHideFormuleTitleDirective implements OnInit {
  @Input() routeId: string = '';
  constructor(private location: Location, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.routeId || this.location.path().startsWith('/formule/new')) {
      this.elementRef.nativeElement.innerHTML = 'Formule Toevoegen';
    } else {
      this.elementRef.nativeElement.innerHTML = 'Formule Wijzigen';
    }
  }
}
