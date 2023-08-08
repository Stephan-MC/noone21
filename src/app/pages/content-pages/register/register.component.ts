import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginType } from 'src/app/shared/Enums/Login-type.enum';
import { GlobalService } from 'src/app/shared/services/global.service';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { RequestService } from 'src/app/shared/services/request.service';
import { Subscription } from 'rxjs';
import { AuthenticationUrls } from '../authentication-urls.enum';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'src/app/libs/localstorage';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { Location, LocationStrategy } from '@angular/common';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  type: number = 1;
  LoginType = LoginType;
  returnUrl:string;
  disableButton: boolean = false;
  form: UntypedFormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toasterService: ToastrService,
    private location: Location, 
    private locationStrategy: LocationStrategy,
    private authService: SocialAuthService
  ) {
    this.type = this.route.snapshot.data['type'];
    console.log("RegisterComponent -> constructor -> this.type", this.type);
    this.form = this.fb.group(this.formElements());

  }

  ngOnInit(): void {
    this.returnUrl=this.document.location.origin;

  }



  formElements(): Object {
    let phoneValidation = this.type == LoginType.vendor ? [Validators.required] : [Validators.required];
    return {
      // 'user_name': ['', [Validators.required]],
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(emailRegEx)]],
      'password': ['', [Validators.required, Validators.maxLength(15)]],
      'city': ['', [Validators.required]],
      'returnUrl': this.returnUrl,
      'role_id': [this.type == LoginType.vendor ? 4 : 3, [Validators.required]],
      'phone_no': ['']
     
    }

  }


  goToSignIn() {
    this.router.navigate(['pages/login']);
  }

  submit() {
    this.form.get("returnUrl").setValue(this.returnUrl);
    let form = this.form.getRawValue();
    this.apiCall(form);
  }

  apiCall(form) {
    this.disableButton = true;
    let url = form['social_id'] ? UserUrls.SOCIAL_LOGIN : AuthenticationUrls.REGISTER_POST;
    this.requestService.sendRequest(url, 'POST', form).subscribe(res => {
      console.log("RegisterComponent -> submit -> res", res);
      this.disableButton = false;
      if (res && res.status && res.result.data && res.result.data.role_id) {
         if(form['social_id']){
            this.localStorage.set("token", res.result.data.active_jwt_token);
            this.localStorage.set("email", res.result.data.email);
            this.localStorage.setObject("user_details", res.result.data);
         }  
        if (res.result.data && res.result.data.role_id == 4) {
          this.router.navigate(['dashboard/vendor']);
        }

        if (res.result.data && res.result.data.role_id == 3) {
          this.router.navigate(['dashboard/buyer']);
        }
        if(form['social_id']){
            this.toasterService.success(res.message, 'success');
        }else{
          this.toasterService.success(res.message, 'success');
          this.router.navigate(['pages/signup-success']);
        }

      } else {
        this.toasterService.error(res.message, 'Error');
      }
    }, error => {
      this.disableButton = false;
      this.toasterService.error(error.error ? error.error.message : error.message, 'Error');
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      console.log("LoginComponent -> signInWithGoogle -> res", res);
      let form = this.form.getRawValue();
      form['first_name'] = res.firstName;
      form['last_name'] = res.lastName;
      form['email'] = res.email;
      form['social_type'] = res.provider == "FACEBOOK" ? 1 : 2;
      form['social_id'] = res.id;
      form['role_id'] = this.type == LoginType.vendor ? 4 : 3;
      this.apiCall(form);
    }, error => {

    });
  }


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      console.log("LoginComponent -> signInWithFB -> res", res)
      let form = this.form.getRawValue();
      form['first_name'] = res.firstName;
      form['last_name'] = res.lastName;
      form['email'] = res.email;
      form['social_type'] = res.provider == "FACEBOOK" ? 1 : 2;
      form['social_id'] = res.id;
      form['role_id'] = this.type == LoginType.vendor ? 4 : 3;
      this.apiCall(form);
    }, error => {

    });
  }

  gotoSignIn() {
    if (this.type == LoginType.vendor) {
      this.router.navigate(['pages/vendor-login']);
    }
    if (this.type == LoginType.buyer) {
      this.router.navigate(['pages/buyer-login']);
    }
  }
}
