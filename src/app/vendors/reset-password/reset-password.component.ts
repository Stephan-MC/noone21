import { Component, OnInit, SimpleChanges } from '@angular/core';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { mapping } from '../vendor-util';
import { markFormGroupTouched, deepCopy, removeObjectProperties, getIdsFromArray } from 'src/app/shared/utils/common-functions';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userId = null;
  singleUserObject = null;
  fgroup: UntypedFormGroup;
  constructor(private localStorage: LocalStorage,
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private requestService: RequestService,) {
    this.userId = this.localStorage.getObject('user_details').id;
    this.getUser(this.userId);
    this.fgroup = this.formBuilder.group({
      password: [null, Validators.required],
      repeat: [null, Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'repeat') });
  }

  ngOnInit(): void {
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


  getUser(id) {
    this.requestService.sendRequest(UserUrls.SINGLE_GET + id, 'GET', {}).subscribe(res => {

      if (res && res.status) {
        this.singleUserObject = mapping(res.result.data);
      } else {

        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      // this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  resetPasswords() {
    markFormGroupTouched(this.fgroup);

    if (!this.fgroup.valid) {
      this.toastrService.error('Please enter correct password');
      return false;
    }

    if (this.fgroup.valid) {


      let params = {
        "password": this.fgroup.value.password,
        id: this.userId,
        // is_approved: 1
      };
      // this.subscription.push(
      this.requestService.sendRequest(UserUrls.RESET_POST, 'POST', params).subscribe(res => {
        // this.hideSpinner();
        if (res.status) {
          this.toastrService.success(res.message, "Success");
          this.onLogout();
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

  onLogout() {
    let email = this.localStorage.get('email');
    this.requestService.sendRequest(AuthenticationUrls.LOGOUT_GET, 'GET', { email: email, token: this.localStorage.get('token') }).subscribe(res => {
      if (res && res.status) {
        localStorage.clear();
        this.toastrService.success(res.message, 'success');
        // this.router.navigate(['pages/landing']);
        this.router.navigate(['/']);
      } else {
        this.toastrService.error(res.message, 'Error');
      }
    }, error => {
      localStorage.clear();
      // this.toasterService.success(res.message, 'success');
      // this.router.navigate(['pages/landing']);
      this.router.navigate(['/']);
      this.toastrService.error(error.error ? error.error.message : error.message, 'Error');
    })
  }

}
