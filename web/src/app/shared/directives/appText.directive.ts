import { Directive, ElementRef, Renderer2, Input , OnInit} from '@angular/core';

@Directive({
  selector: '[appText]'
})
export class AppTextDirective implements  OnInit {

    @Input('appText') text: string;

    constructor(private el: ElementRef,
        private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
    }
}
