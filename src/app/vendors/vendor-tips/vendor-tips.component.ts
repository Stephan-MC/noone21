import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vendor-tips',
  templateUrl: './vendor-tips.component.html',
  styleUrls: ['./vendor-tips.component.scss']
})
export class VendorTipsComponent implements OnInit {
  vmcls = false;
  vmclse = false;

  constructor() { }

  ngOnInit(): void {

  }

  vmorebtn(){
    this.vmcls = !this.vmcls;
  }  
  
  vmorebtns(){
    this.vmclse = !this.vmclse;
  }

}
