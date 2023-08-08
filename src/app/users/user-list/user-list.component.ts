import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LooseObject, isEmptyObjectKeys, mergeRecursive, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { UserUrls } from '../user-urls.enum';
import { id } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedUrls } from 'src/app/shared/utils/shared-urls.enum';
import { isObject } from 'util';
import { Observable, ObservableInput, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { RejectionReasonUrls } from 'src/app/masters/rejection-reason/rejection-reason-urls.enum';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ReviewUrls } from 'src/app/reviews/review-urls.enum';
import { PasswordValidation } from '../password-validation';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('RejectionModal', { static: false }) rejectionModal: ModalDirective;
  @ViewChild('verificationsModal', { static: false }) verificationsModal: ModalDirective;
  @ViewChild('reviewsModal', { static: false }) reviewsModal: ModalDirective;
  @ViewChild('resetPModal', { static: false }) resetPModal: ModalDirective;

  roles = [];
  rows = [];
  total = 0;
  page = 1;
  offset = 0;
  limit = 20;
  smallNumPages = 0;

  sortType = 1;


  form: UntypedFormGroup;
  fg: UntypedFormGroup;
  filterForm: UntypedFormGroup;
  selectedUser: any;
  isEmptyObjectKeys = isEmptyObjectKeys;

  searching = false;
  searchFailed = false;
  statuses = [{ id: 1, name: 'created' }, { id: 2, name: 'Waiting For Approval' }, { id: 3, name: "Rejected" }, { id: 4, name: 'Approved' }];

  approvals = [];
  reviews = [];
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private loaderService: LoaderService
  ) {

    this.fg = this.formBuilder.group({
      password: [null, Validators.required],
      repeat: [null, Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'repeat') });

    this.form = this.formBuilder.group({
      'rejection_reason_id': ['', Validators.required],
      'comments': [''],
      'status_id': [''],
      'user_id': [''],
    })
    this.filterForm = this.formBuilder.group({
      'status_id': [null],
      'search': [''],
      'role_id': [null],
    })
  }
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: UntypedFormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }


  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  onFilter() {
    this.offset = 0;
    this.page = 1;
    this.getUsers();
  }

  onReset() {
    this.offset = 0;
    this.page = 1;
    this.filterForm.reset();
    this.getUsers();
  }
  Delete(id){
   
    this.requestService.sendRequest(SharedUrls.Delete, 'POST',{'id':id}).subscribe(res => {
      this.loaderService.hide();
      if (res && res.status) {
        this.toastrService.success(res.message, null);
        this.getUsers();
      } else {
        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.loaderService.hide();
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  approvalReviews(row){
    this.router.navigate(['/dashboard/admin/approval-reviews/'+row.id]);
    // this.router.navigate(['/dashboard/admin/approval-reviews'], {token: row.active_jwt_token} );
   console.log(row.u_uid);
   return;
  }
  getRoles() {
    this.requestService.sendRequest(SharedUrls.ROLES_GET, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.roles = res.result.data;
        console.log("UserListComponent -> getRoles -> this.roles", this.roles)
      } else {

      }
    }, error => {

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
    this.getUsers();
  }

  getUsers() {
    let params = this.makeParams();
    this.requestService.sendRequest(UserUrls.ALL_GET, 'GET', params).subscribe(res => {
      if (res && res.status) {
        this.total = res.result.total;
        this.rows = res.result.data;
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }

  onPageChange(event) {
    console.log("DoctorListComponent -> pageChanged -> event", event);
    this.offset = event.offset;
    this.page = event.offset + 1;
    this.getUsers()

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

  showRejectionModal(row): void {
    this.selectedUser = row;
    this.rejectionModal.show();
  }

  hideRejectionModal(): void {
    this.rejectionModal.hide();
  }
  approveUser(row) {
   
    let formData: LooseObject = {};
    let params = {
      "status_id": 4,
      "user_id": row.id,
      "email": row.email,
      "comments":"Congratulations, Your registration is approved!",
      // is_approved: 1
    };
    // formData['status_id'] = 4;
    // formData['user_id'] = row.id;
    // formData['comments'] = "Congratulations, Your registration is approved!";
    this.loaderService.show();
    this.requestService.sendRequest(SharedUrls.ADD_POST, 'POST', params).subscribe(res => {
      this.loaderService.hide();
      if (res && res.status) {
        this.toastrService.success(res.message, null);
        
        this.getUsers();
      } else {
        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.loaderService.hide();
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }

  addRejection() {
    let formData = this.form.getRawValue();
    if (formData && !isObject(formData['rejection_reason_id'])) {
      this.toastrService.error('Please Select valid Rejection Reason');
      return false;
    }
    formData['rejection_reason_id'] = formData['rejection_reason_id']['id'];
    formData['user_id'] = this.selectedUser.id;
    formData['status_id'] = 3;
    this.loaderService.show();
    this.requestService.sendRequest(SharedUrls.ADD_POST, 'POST', formData).subscribe(res => {
      this.loaderService.hide();
      if (res && res.status) {
        this.hideRejectionModal();
        this.form.reset();
        this.toastrService.success(res.message, 'Success');
        this.getUsers();
      } else {
        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.loaderService.hide();
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }


  searchRejection = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchFailed = true),
      switchMap(term =>
        term.length <= 2 ? this.returnEmpty() : this.doApiCall(RejectionReasonUrls.ALL_GET, { search: term })
      ),
      tap(() => this.searchFailed = false)
    )
  rejectionFormatter = (x: { name: string }) => x.name;

  doApiCall(url, data): ObservableInput<any[]> {
    console.log("SkillFormComponent -> data", data)

    return <any>this.requestService.sendRequest(url, 'get', data)
      .pipe(
        tap(() => this.searchFailed = false),
        map((res) => {
          if (res['result']['data'].length == 0) {
            this.showNotFoundMessage();
          }
          return res['result']['data']
        }),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))

  }
  showNotFoundMessage() {
    this.toastrService.error('No record Found');
  }
  returnEmpty() {
    return of([]);
  }

  viewVerifications(user) {
    this.selectedUser = user;
    this.getApprovals(user.id);

  }
  getApprovals(id) {
    let formData = { user_id: id };
    this.requestService.sendRequest(SharedUrls.ALL_GET, 'GET', formData).subscribe(res => {
      if (res && res.status) {
        this.verificationsModal.show();
        this.approvals = res.result.data.reverse();
      } else {
        this.toastrService.error(res.message, 'Success');

      }
    }, error => {
      this.toastrService.error(error.error ? error.error.message : error.message, 'Error');
    });
  }

  viewReviews(user) {
    let params = {
      "pagination": 0,
      user_id: user.id,
      // is_approved: 1
    };
    // this.subscription.push(
    this.requestService.sendRequest(ReviewUrls.ALL_GET, 'get', params).subscribe(res => {
      // this.hideSpinner();
      if (res.status) {
        this.reviewsModal.show();
        this.reviews = res.result.data;
        this
      } else {
        this.toastrService.error(res.message, "Error");
      }
    }, error => {
      // this.hideSpinner();
      this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
    })
    // );
  }

  onResetP(user) {
    this.selectedUser = user;
    this.resetPModal.show();
  }

  resetPassword() {
    if (this.fg.valid) {


      let params = {
        "password": this.fg.value.password,
        id: this.selectedUser.id,
        // is_approved: 1
      };
      // this.subscription.push(
      this.requestService.sendRequest(UserUrls.RESET_POST, 'POST', params).subscribe(res => {
        // this.hideSpinner();
        if (res.status) {
          this.resetPModal.hide();
          this.toastrService.success(res.message, "Success");
          this.getUsers();
          this
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        // this.hideSpinner();
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      })
      // );
    }
  }
}
