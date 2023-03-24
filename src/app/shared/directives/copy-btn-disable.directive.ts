import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appCopyBtnDisable]',
})
export class CopyBtnDisableDirective implements OnChanges {
  @Input() copyText: any;
  @Input() currentCopyText: any;
  constructor(private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['copyText'] && this.currentCopyText === this.copyText) {
      this.elementRef.nativeElement.style.visibility = 'hidden';
    } else {
      this.elementRef.nativeElement.style.visibility = 'visible';
    }
  }
}
