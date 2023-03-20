import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Location } from '@angular/common';
@Directive({
  selector: '[appHideOrShowFormIfPathHasFiche]',
})
export class HideOrShowFormIfPathHasFicheDirective
  implements OnInit, OnChanges
{
  @Input() recentCreatedFicheId: string = '';
  constructor(private elementRef: ElementRef, private location: Location) {}

  ngOnInit(): void {
    if (this.location.path() === '/fiches/new' && !this.recentCreatedFicheId) {
      this.elementRef.nativeElement.style.position = 'absolute';
      this.elementRef.nativeElement.style.visibility = 'hidden';
    }

    if (this.location.path().substring(0, 12) === '/fiches/edit') {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recentCreatedFicheId']) {
      if (this.location.path() === '/fiches/new' && this.recentCreatedFicheId) {
        this.elementRef.nativeElement.style.visibility = 'visible';
        this.elementRef.nativeElement.style.position = 'relative';
      }
    }
  }
}
