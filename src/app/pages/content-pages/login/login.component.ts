import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginType } from 'src/app/shared/Enums/Login-type.enum';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/shared/services/request.service';
import { AuthenticationUrls } from '../authentication-urls.enum';
import { LocalStorage } from 'src/app/libs/localstorage';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { UserUrls } from 'src/app/users/user-urls.enum';
declare var OAuth: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: number = 1;
  LoginType = LoginType;

  disableButton: boolean = false;

  form: UntypedFormGroup;


  constructor(public router: Router,
    public route: ActivatedRoute,
    private requestService: RequestService,
    private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private toastr: ToastrService,
    private authService: SocialAuthService
  ) {
    this.type = this.route.snapshot.data['type'];

    console.log("LoginComponent -> constructor -> this.type ", this.type);
    this.form = this.fb.group(this.formElements());
    if (this.type == 1) {
      this.form.get('role_id').setValue(1);
    }
  }

  ngOnInit(): void {
  }

  formElements(): Object {
    // let phoneValidation = this.type == LoginType.doctor ? [Validators.required] : [];
    return {
      'email': [''],
      'password': [''],
      'role_id': [this.type == LoginType.vendor ? 4 : 3, [Validators.required]]
    }

  }

  gotoSignUP() {

    document.getElementById('global-loader').style.visibility='hidden';
    this.router.navigate(['pages/register']);
  }

  gotoForgotPassword() {
    this.localStorage.set('loginType', <any>this.type);
    this.router.navigate(['pages/forgot-password']);
  }

  submit() {
    let form = this.form.getRawValue();
    // form['role_id'] = this.type;
    this.disableButton = true;
    this.requestService.sendRequest(AuthenticationUrls.LOGIN_POST, 'POST', form).subscribe(res => {

      console.log("LoginComponent -> submit -> res", res);
      this.disableButton = false;

      if (res && res.status) {

        // if (res.result.data.status_id != 4) {
        //   this.toastr.error('Your profile is not approved yet!', 'Not Approved!');
        // }

        this.toastr.success('Login successful !', 'Login!');

        this.localStorage.set("token", res.result.data.active_jwt_token);
        this.localStorage.set("email", res.result.data.email);
        this.localStorage.set("exp", res.result.data.expires_in);
        
        this.localStorage.setObject("user_details", res.result.data);

        if (res.result.data && res.result.data.role_id == 1) {
          this.router.navigate(['dashboard/admin']);
        }

        if (res.result.data && res.result.data.role_id == 4) {
          this.router.navigate(['dashboard/vendor']);
        }

        if (res.result.data && res.result.data.role_id == 3) {
          this.router.navigate(['dashboard/buyer']);
        }

      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }


  apiCall(form) {
    this.disableButton = true;
    let url = form['social_id'] ? UserUrls.SOCIAL_LOGIN : AuthenticationUrls.REGISTER_POST;
    this.requestService.sendRequest(url, 'POST', form).subscribe(res => {
      console.log("RegisterComponent -> submit -> res", res);
      this.disableButton = false;
      if (res && res.status && res.result.data && res.result.data.role_id) {

        this.localStorage.set("token", res.result.data.active_jwt_token);
        this.localStorage.set("email", res.result.data.email);
        this.localStorage.setObject("user_details", res.result.data);

        if (res.result.data && res.result.data.role_id == 4) {
          this.router.navigate(['dashboard/vendor']);
        }

        if (res.result.data && res.result.data.role_id == 3) {
          this.router.navigate(['dashboard/buyer']);
        }
        this.toastr.success(res.message, 'success');

      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      this.disableButton = false;
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
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


  twitterLogin() {
    OAuth.initialize('BPc5JYASKHGZiCxCp1mc7HmOuFg');
    // Use popup for OAuth
    //facebook, google, linkedin2, twitter
    OAuth.popup('facebook').then(twitter => {
      console.log('twitter:', twitter);
      // Prompts 'welcome' message with User's email on successful login
      // #me() is a convenient method to retrieve user data without requiring you
      // to know which OAuth provider url to call
      twitter.me().then(data => {
        console.log('data:', data);
        alert('Twitter says your email is:' + data.email + ".\nView browser 'Console Log' for more details");
      });
      // Retrieves user data from OAuth provider by using #get() and
      // OAuth provider url    
      // twitter.get('/1.1/account/verify_credentials.json?include_email=true').then(data => {
      //   console.log('self data:', data);
      // })
    });
  }

  gotoSignUp() {
    if (this.type == LoginType.vendor) {
      this.router.navigate(['pages/vendor-register']);
    }
    if (this.type == LoginType.buyer) {
      this.router.navigate(['pages/buyer-register']);
    }
  }
}
