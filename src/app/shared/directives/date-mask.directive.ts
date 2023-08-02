import { Directive, ElementRef, OnDestroy, Input, HostListener } from '@angular/core';
// import * as textMask from 'custom_node_modules/vanila-text-mask/vanillaTextMask.js';
// import * as maskInput from '../../../custom_node_modules/vanila-text-mask/';
// import { maskInput } from 'custom_node_modules/vanila-text-mask/vanillaTextMask.js';
declare var require: any;
var maskInput = require('../../../custom_node_modules/vanila-text-mask/vanillaTextMask.js');
import { changeDateFormat, createDateAsUTC } from '../utils/common-functions';
import { Subscription, fromEvent } from 'rxjs';
@Directive({
  selector: '[appMaskDate]'
})
export class MaskDateDirective implements OnDestroy {

  mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // dd/mm/yyyy
  maskedInputController;
  @Input() appMaskDate;
  eventSubscription: Subscription;

  //========================================================================================
  /*                                                                                      *
   *The Constructor is a default method of the class that is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses*
   *                                                                                      */
  //========================================================================================

  constructor(private element: ElementRef) {
    // this.maskedInputController = textMask.maskInput({
    //   inputElement: this.element.nativeElement,
    //   mask: this.mask
    // });
    // console.log("MaskDateDirective -> constructor -> maskInput", maskInput)
    this.maskedInputController = maskInput.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask
    });

  }

  //========================================================================================
  /*                                                                                      *
   *Angular has completed initialization of a component's view. It is invoked only once when the view is instantiated.*
   *                                                                                      */
  //========================================================================================

  ngAfterViewInit() {
    fromEvent(this.element.nativeElement, 'focusout').subscribe(current => {
      // console.log('current focusout', current['target'].value);
    });
    fromEvent(this.element.nativeElement, 'focus').subscribe(current => {
      if (current['target'].value) {
        let arr = current['target'].value.split('/');
        if (arr[0].length == 1) {
          arr[0] = '0' + arr[0];
        }
        if (arr[1].length == 1) {
          arr[1] = '0' + arr[1];
        }
        // console.log('arr', arr)
        this.element.nativeElement.value = arr.join('/');
        // this.element.nativeElement.value = createDateAsUTC(new Date(arr.join('/')));
      }
    });
    /**
  *     Turn event into observable sequence.
  */
    this.eventSubscription = fromEvent(this.element.nativeElement, 'input').subscribe(current => {
      // console.log('input', this.element.nativeElement.value, createDateAsUTC(new Date(this.element.nativeElement.value)));
      this.appMaskDate['_datepickerInput']._onInput(this.element.nativeElement.value ? createDateAsUTC(new Date(this.element.nativeElement.value)) : '');
    });
  }

  //========================================================================================
  /*                                                                                      *
   *method that performs custom clean-up, invoked immediately after a directive,
    pipe, or service instance is destroyed.*
   *                                                                                      */
  //========================================================================================

  ngOnDestroy() {
    // console.log('ngOnDestroy Date Directive');
    this.destroyRef();
  }

  //========================================================================================
  /*                                                                                      *
   *                           Destroy Description and References                          *
   *                                                                                      */
  //========================================================================================

  destroyRef() {
    this.maskedInputController.destroy();
    this.eventSubscription.unsubscribe();
  }
}