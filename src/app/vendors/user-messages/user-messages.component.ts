import { MapsAPILoader } from '@agm/core';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalStorage } from 'src/app/libs/localstorage';
import { GlobalService } from 'src/app/shared/services/global.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { markFormGroupTouched } from 'src/app/shared/utils/common-functions';
@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss']
})
export class UserMessagesComponent implements OnInit {
  userList=[];
  conversions=[];
  authUser:number=0;
  userId='';
  msgClientId='';
  @Input()userName: string; 
  form: UntypedFormGroup;
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private GlobalService: GlobalService,
    private localStorage: LocalStorage,
    private route: ActivatedRoute
  ) {
    this.userId=this.localStorage.getObject('user_details').id;
    this.form = this.fb.group(this.formElements());
  }
  ngOnInit(): void {
    this.getHistory();
  
  }

  formElements() {
    return {
          'message':['',[Validators.required]],
          'reciver_id':[''],
          'sender_id':['']
          }
  }
  getSingleData(conId,authId=this.userId) {
    this.msgClientId=conId;
    this.requestService.sendRequest('message/getMsgSingle', 'GET', {conId:conId,authId:authId}).subscribe(res => {
      if (res) {
        this.conversions=res;
        console.log('myMsgData'+res[0].sender_id);
        // $('.backend-loader').css('display','none');
      } 
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  getHistory() {
    
    this.requestService.sendRequest('message/get', 'GET', {authID:this.userId}).subscribe(res => {
      if (res) {
        this.userList = res;
        console.log('res data= '+res[0]);
        // $('.backend-loader').css('display','block');
        if(res[0]){
          let conversionId=res[0].userId;
              if(conversionId==this.userId){
                  conversionId=res[0].sender_id;
              }
              this.msgClientId=conversionId;
              this.getSingleData(conversionId);

        }
      }else{}
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  onSubmit(){

    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      // this.toastr.error('Type your message');
      return;
    }
    this.form.patchValue({reciver_id:this.msgClientId,
      sender_id:this.userId
    });
    this.requestService.sendRequest('message/add', 'POST',this.form.value).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
         this.getSingleData(this.msgClientId);
         this.form.reset();

      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
  
    });
  }
}
