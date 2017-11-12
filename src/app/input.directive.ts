import { Directive, Renderer, ElementRef } from '@angular/core';
@Directive({
  selector : 'input'
})
export class InputDirective {
  constructor(public renderer: Renderer, public elementRef: ElementRef) {}
  
  // It won't work at construction time
  ngOnInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
  }
}
