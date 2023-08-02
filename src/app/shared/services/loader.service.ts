import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner: NgxSpinnerService) { }
  public show() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);
  }

  hide() {
    this.spinner.hide();
  }
}
