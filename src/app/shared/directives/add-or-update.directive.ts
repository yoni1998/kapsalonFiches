import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddOrUpdate]',
})
export class AddOrUpdateDirective implements OnInit {
  @Input() routeId: string = '';
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.routeId) {
      this.elementRef.nativeElement.innerHTML = 'Klantenfiche Toevoegen';
    } else {
      this.elementRef.nativeElement.innerHTML = 'Klantenfiche Wijzigen';
    }
  }
}
