import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  requestForm: UntypedFormGroup;
  requestFormPop: UntypedFormGroup;
  @Input() reciver_id:'';
  userId='';
    // siteKey = "6Lcl9uQZAAAAAEM1-mcJK-O8THedz6Zvxn0Ysv0k";
    siteKey = "6Ldi0usZAAAAAIIYTSs6zmnwjuwNGcZQuUhY0xGL";
    // secretkey = "6Lcl9uQZAAAAAH5_tjxGucIBwj8N-eIL8T9psH-i";
    secretkey = "6Ldi0usZAAAAANMrhac1NE3VMXxIbP7CpEhe8Wzu";
    recaptcha = null;
    handleSuccessModal = false;
  handleSuccessOuter = false;
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private toastr: ToastrService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private localStorage: LocalStorage,
  ) { this.requestForm = this.formBuilder.group({
    message: ['', Validators.required],
    reciver_id:[''],
    sender_id:[''],
    
  });
  this.userId=this.localStorage.getObject('user_details').id;
}

  ngOnInit(): void {
  }
  handleSuccessPopup(event) {
    console.log("PropertyDetailComponent -> handleSuccessPopup -> event", event)
    this.handleSuccessModal = true;
    
  }

  handleSuccessOuterForm(event) {
    console.log("PropertyDetailComponent -> handleSuccessPopup -> event", event)
    this.handleSuccessOuter = true;
  }
  private markFormGroupTouched(formGroup: UntypedFormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  handleReset() {
    this.handleSuccessModal = false;
    this.handleSuccessOuter = false;
  }

  messageSent(form,verify){
    this.markFormGroupTouched(form);
    
    form.patchValue({reciver_id:this.reciver_id,
      sender_id:this.userId
    });
    let formValues = form.value;
  
    if (form.valid) {
      this.requestService.sendRequest('message/add','POST', formValues).subscribe(res => {
        if (res && res.status) {
          form.reset();
          this.handleReset();
          // this.toastrService.success(res.message, 'Success');
           this.router.navigate(['dashboard/vendor/user-messages']);
          //  $("#msgModel").modal('hide');
          document.body.classList.remove("modal-open");
          document.body.classList.add("modal-close");
          document.body.querySelector(".modal-backdrop.fade.show").classList.remove("modal-backdrop");
         
        } 
      }, error => {
        console.log("PropertyDetailComponent -> addRequestForm -> error", error)
      })
    }

  



  }
  

}
