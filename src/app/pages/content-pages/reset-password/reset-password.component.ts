
import {Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective,UntypedFormGroup, UntypedFormBuilder, NgForm, Validators} from   '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { RequestService } from 'src/app/shared/services/request.service';
import { AuthenticationUrls } from '../authentication-urls.enum';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { LoginType } from 'src/app/shared/Enums/Login-type.enum';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  disableButton: boolean = false;
  form: UntypedFormGroup;
  type: number = 1;
  token:string;
  constructor( 
              public route: ActivatedRoute,
              public router: Router,
              private requestService: RequestService,
              private fb: UntypedFormBuilder,
              private toastr: ToastrService
          ) { 
    this.form = this.fb.group(this.formElements());
    this.token = this.route.snapshot.params['token'];
  }
  ngOnInit(): void {
  }
  formElements(): Object {
    return {
      'password': ['', [
                      Validators.required,
                        Validators.minLength(6),
                        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$'),
                      ] 
                  ],
    }
  }
  submit() {
    if (this.form.valid) {
      console.log('form submitted');
      // paK@222333Qqw
    }else{
      return ;
    }
    let form = this.form.getRawValue();
    this.sumitForm(form);
  }

  sumitForm(form) {
    let Fobj = this.form.getRawValue();
    this.disableButton = false;
    this.requestService.sendRequest(AuthenticationUrls.PASSWORD_RESET, 'get', { password: Fobj.password,token:this.token}).subscribe(res => {
      console.log("LoginComponent -> submit -> res", res);
      if (res && res.status) {
        this.toastr.success(res.message, 'Forgot Password!');
        if(res.result.data.role_id==4){
             this.router.navigate(['pages/vendor-login']);
        }else{
          this.router.navigate(['pages/buyer-login']);
        }
        //this.router.navigate(['pages/vendor-login']);
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
}
