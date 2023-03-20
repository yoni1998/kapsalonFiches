import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appRemoveAddFicheBtn]',
})
export class RemoveAddFicheBtnDirective implements OnChanges {
  @Input() removeAddFichesBtn: any = true;
  constructor(private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['removeAddFichesBtn'].currentValue === true) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }
}
