import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(private el:ElementRef) {
    // this.el.nativeElement.style.class = 'rendu';
    this.el.nativeElement.style.backgroundColor = 'green';
  }

}
