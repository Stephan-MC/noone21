import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appDisableAutofill]'
})
export class DisableAutofillDirective implements AfterViewInit {

    private _chrome = navigator.userAgent.indexOf('Chrome') > -1;
    constructor(private _el: ElementRef) { }
    ngOnInit() {
        if (this._chrome) {
            if (this._el.nativeElement.getAttribute('autocomplete') === 'off') {
                setTimeout(() => {
                    this._el.nativeElement.setAttribute('autocomplete', 'offoff');
                });
            }
        }
    }

    // constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) { }

    ngAfterViewInit() {
        //     const randomString = Math.random().toString(36).slice(-6);
        //     console.log("DisableAutofillDirective -> ngAfterViewInit -> randomString", randomString);
        //     this.renderer.setAttribute(this.el.nativeElement, 'name', randomString);
        //     this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', randomString);
    }

}