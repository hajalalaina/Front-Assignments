import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appErreur]'
})
export class ErreurDirective {

  constructor(private el:ElementRef) {
    this.el.nativeElement.style.color = 'red';
  }

}
