import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { AuthenticationUrls } from '../authentication-urls.enum';
import { LoginType } from 'src/app/shared/Enums/Login-type.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  disableButton: boolean = false;

  form: UntypedFormGroup;
  type: number = 1;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private requestService: RequestService,
    private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group(this.formElements());
  }

  ngOnInit(): void {
    this.type = parseInt(this.localStorage.get('loginType'));
  }

  formElements(): Object {
    // let phoneValidation = this.type == LoginType.doctor ? [Validators.required] : [];
    return {
      'email': ['', Validators.required],
    }

  }

  onSubmit() {
    let form = this.form.getRawValue();
    this.disableButton = true;
    let redirectUrl=location.origin+'/pages/password-reset';
    this.requestService.sendRequest(AuthenticationUrls.FORGOT_PASSWORD_GET, 'get', { email: form.email,redirectUrl:redirectUrl }).subscribe(res => {

      console.log("LoginComponent -> submit -> res", res);
      this.disableButton = false;

      if (res && res.status) {

        this.toastr.success(res.message, 'Forgot Password!');
        this.goBack();

      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  goBack() {
    if (this.type == LoginType.vendor) {
      this.router.navigate(['pages/vendor-login']);
    }

    if (this.type == LoginType.buyer) {
      this.router.navigate(['pages/buyer-login']);
    } this.localStorage.remove('loginType');

  }
}
