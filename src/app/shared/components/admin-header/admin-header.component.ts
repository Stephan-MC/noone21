import { Component, OnInit } from '@angular/core';
import { LooseObject, isEmptyObject } from '../../utils/common-functions';
import { LocalStorage } from 'src/app/libs/localstorage';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  isEmptyObject = isEmptyObject;
  user: LooseObject = {};
  constructor(private localStorage: LocalStorage) {
    this.user = this.localStorage.getObject('user_details');
    console.log("AdminHeaderComponent -> constructor -> this.user", this.user);
  }


  ngOnInit(): void { }


}
