import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/shared/services/request.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { LoginType } from 'src/app/shared/Enums/Login-type.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { emailRegEx } from '../../utils/email-validation_pattern.config';
import {Location, LocationStrategy, PlatformLocation } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-request-lead',
  templateUrl: './request-lead.component.html',
  styleUrls: ['./request-lead.component.scss']
})
export class RequestLeadComponent implements OnInit {
  pagelink= null;
  requestForm: UntypedFormGroup;
  requestFormPop: UntypedFormGroup;
    // siteKey = "6Lcl9uQZAAAAAEM1-mcJK-O8THedz6Zvxn0Ysv0k";
    siteKey = "6Ldi0usZAAAAAIIYTSs6zmnwjuwNGcZQuUhY0xGL";
    // secretkey = "6Lcl9uQZAAAAAH5_tjxGucIBwj8N-eIL8T9psH-i";
    secretkey = "6Ldi0usZAAAAANMrhac1NE3VMXxIbP7CpEhe8Wzu";
    recaptcha = null;
    handleSuccessModal = false;
  handleSuccessOuter = false;
  constructor( private requestService: RequestService,
    private toastrService: ToastrService,
    private toastr: ToastrService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private location:Location,
    private formBuilder: UntypedFormBuilder,
    private platformLocation: PlatformLocation,
    private _sanitizer: DomSanitizer,
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute) { 
      this.requestForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(emailRegEx)]],
        remark: ['', Validators.required],
        pagelink: this.pagelink,
        recaptcha: ['']
      });
      this.requestFormPop = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(emailRegEx)]],
        remark: ['', Validators.required],
        pagelink: this.pagelink,
        recaptcha: ['']
      });
      this.pagelink=this.location.path();
      // this.pagelink=(platformLocation as any).location.href;
    }

  ngOnInit(): void {
    console.log('baseUrl '+this.locationStrategy.getBaseHref());
  }
    
  handleSuccessPopup(event) {
    console.log("PropertyDetailComponent -> handleSuccessPopup -> event", event)
    this.handleSuccessModal = true;
    
  }

  handleSuccessOuterForm(event) {
    console.log("PropertyDetailComponent -> handleSuccessPopup -> event", event)
    this.handleSuccessOuter = true;
  }

  handleReset() {
    this.handleSuccessModal = false;
    this.handleSuccessOuter = false;
  }


    private markFormGroupTouched(formGroup: UntypedFormGroup) {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
  
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
    }
    getLink(url): SafeUrl {
      return this._sanitizer.bypassSecurityTrustUrl(url);
    }
    addRequestForm(form,verify){
      this.markFormGroupTouched(form);
      let formValues = form.value;
      formValues['pagelink'] = this.pagelink;
      if (form.valid) {
        this.requestService.sendRequest('master/requestLead/add', 'POST', formValues).subscribe(res => {
          if (res && res.status) {
            // this.toastrService.success(res.message, 'Success');
            this.router.navigate(['/pages/thank-you']);
            form.reset();
          } 
        }, error => {
          console.log("PropertyDetailComponent -> addRequestForm -> error", error)
        })
      }




    }
}
