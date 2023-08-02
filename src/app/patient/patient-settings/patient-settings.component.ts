import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { LocalStorage } from 'src/app/libs/localstorage';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { AuthenticationUrls } from 'src/app/pages/content-pages/authentication-urls.enum';
import { isEmptyObjectKeys } from 'src/app/shared/utils/common-functions';

@Component({
  selector: 'app-patient-settings',
  templateUrl: './patient-settings.component.html',
  styleUrls: ['./patient-settings.component.scss']
})
export class PatientSettingsComponent implements OnInit {
  fg: FormGroup;
  userId = null;
  isEmptyObjectKeys = isEmptyObjectKeys;
  constructor(
    private requestService: RequestService,
    private localStorage: LocalStorage,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService
  ) {
    this.fg = this.formBuilder.group({
      password: [null, Validators.required],
      repeat: [null, Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'repeat') });
    this.userId = this.localStorage.getObject('user_details').id;
  }

  ngOnInit(): void {
  }

  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }


  resetPassword() {
    if (this.fg.valid) {


      let params = {
        "password": this.fg.value.password,
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
      this.router.navigate(['']);
      this.toastrService.error(error.error ? error.error.message : error.message, 'Error');
    })
  }
}
