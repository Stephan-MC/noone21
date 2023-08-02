import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { isEmptyObjectKeys, LooseObject, mergeRecursive, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { SharedUrls } from 'src/app/shared/utils/shared-urls.enum';
import { UserUrls } from 'src/app/users/user-urls.enum';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.scss']
})
export class ListPagesComponent implements OnInit {
  roles = [];
  rows = [];
  total = 0;
  page = 1;
  offset = 0;
  limit = 20;
  smallNumPages = 0;
  sortType = 1;
  form: FormGroup;
  fg: FormGroup;
  filterForm: FormGroup;
  selectedUser: any;
  pagetypes:any;
  isEmptyObjectKeys = isEmptyObjectKeys;
  constructor(   private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService) {
      this.filterForm = this.formBuilder.group({
        'page_type': [null],
        'search': ['']
      })
     }

  ngOnInit(): void {
    this.getpages();
    this.getPageType();
  }
  onFilter() {
    this.offset = 0;
    this.page = 1;
    this.getpages();
  }
  viewPage(row){
     console.log(row.id);
  }
  editPage(row){
    this.router.navigate(['dashboard/admin/page-builder/edit-pages/' + row.id]);
    return;
  }
  onReset() {
    this.offset = 0;
    this.page = 1;
    this.filterForm.reset();
    this.getpages();
  }
  onPageChange(event) {
    console.log("DoctorListComponent -> pageChanged -> event", event);
    this.offset = event.offset;
    this.page = event.offset + 1;
    this.getpages()

  }
  AddNewPage(){
    this.router.navigate(['dashboard/admin/page-builder/add-pages']);
    return;
  }
  Delete(row){
   let id=row.id;
    this.requestService.sendRequest('admin/page/delete', 'POST',{'id':id}).subscribe(res => {
      this.loaderService.hide();
      if (res && res.status) {
        this.toastrService.success(res.message, null);
        this.getpages();
      } else {
        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.loaderService.hide();
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  makeParams() {
    let param: LooseObject = {};
    param['page'] = this.page;
    param['pagination'] = 1;
    param['per_page'] = this.limit;
    param = removeEmptyKeysFromObject(mergeRecursive(param, this.filterForm.value));
    return param;
  }
  doSort() {
    this.page = 1;
    this.getpages();
  }
  getpages() {
    let params = this.makeParams();
    this.requestService.sendRequest('admin/page/get', 'GET', params).subscribe(res => {
      if (res && res.status) {
        this.total = res.result.total;
        this.rows = res.result.data;
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  getPageType() {
   
    this.requestService.sendRequest('admin/page/getPageType', 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.pagetypes= res.result.data;
        console.log('page get dropdown');
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  viewProfile(user) {
    this.router.navigate(['pages/vendor/' + user.id]);
  // console.log(this.router.navigate(['pages/vendor-list/' + user.id]));
  return;
    if (user.role.id == 4) {
      this.router.navigate(['pages/vendor/' + user.id])
    }
    if (user.role.id == 3) {
      this.router.navigate(['pages/seller/' + user.id])
    }
  }
}
