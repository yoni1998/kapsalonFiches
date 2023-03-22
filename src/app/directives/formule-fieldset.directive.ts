import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFormuleFieldset]',
})
export class FormuleFieldsetDirective implements OnChanges {
  @Input() aantalFormules: any;
  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['aantalFormules']) {
      if (this.aantalFormules > 1 || this.aantalFormules === 0) {
        this.elementRef.nativeElement.innerHTML =
          this.aantalFormules + ' Formules';
      } else {
        this.elementRef.nativeElement.innerHTML =
          this.aantalFormules + ' Formule';
      }
    }
  }
}
