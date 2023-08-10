import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginType } from 'src/app/shared/Enums/Login-type.enum';
import { GlobalService } from 'src/app/shared/services/global.service';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { Validators, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { RequestService } from 'src/app/shared/services/request.service';
import { Subscription } from 'rxjs';
import { AuthenticationUrls } from '../authentication-urls.enum';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'src/app/libs/localstorage';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { UserUrls } from 'src/app/users/user-urls.enum';
@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  token: string;
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder
    

  ) { this.token = this.route.snapshot.params['token'];


}

  ngOnInit(): void {

   
  }
  verifyAccount(){
      this.VerfiyUser(this.token);
  }
  VerfiyUser(token){
    this.requestService.sendRequest(UserUrls.UserVerify+token, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
     
        if (res.result.data && res.result.data.role_id == 4) {
          this.router.navigate(['pages/vendor-login']);
        }else{
          this.router.navigate(['pages/buyer-login']);
        }
        
      }else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("Images compontent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');
  
    });
  }
}
