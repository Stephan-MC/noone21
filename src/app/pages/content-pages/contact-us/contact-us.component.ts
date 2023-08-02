import { Location, PlatformLocation } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  myLatLng = { lat: 5.376964, lng: 100.399383 };
  pagelink= null;
  @ViewChild('reviewModal', { static: false }) rejectionModal: ModalDirective;
  @ViewChild('reqmodalclose') reqmodalclose;
  @ViewChild('reqmodalopen') reqmodalopen;
  @ViewChild('reqmodalmain') reqmodalmain;
  requestForm: FormGroup;
  requestFormPop: FormGroup;
  public useGlobalDomain: boolean = false;
     siteKey = "6Le9qoQaAAAAAJgYsyyrkB7pZjsRQEwyNqoYL6PG";
     secretkey = "6Le9qoQaAAAAALJ_6YZOsT2gUghcZYzvrdatvo0K";
    // siteKey = "6Ldi0usZAAAAAIIYTSs6zmnwjuwNGcZQuUhY0xGL";
    // secretkey = "6Lcl9uQZAAAAAH5_tjxGucIBwj8N-eIL8T9psH-i";
    // secretkey = "6Ldi0usZAAAAANMrhac1NE3VMXxIbP7CpEhe8Wzu";
    recaptcha = null;
    handleSuccessModal = false;
  handleSuccessOuter = false;

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  constructor( private requestService: RequestService,
    private toastrService: ToastrService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private location:Location,
    private formBuilder: FormBuilder,
    private platformLocation: PlatformLocation,
    private _sanitizer: DomSanitizer,
    private route: ActivatedRoute)
   {
    this.requestForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegEx)]],
      remark: ['', Validators.required],
      pagelink: this.pagelink,
      recaptcha: [''],
    });
    this.requestFormPop = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegEx)]],
      remark: ['', Validators.required],
      pagelink: this.pagelink,
      recaptcha: ['']
    });
    this.pagelink=this.location.path();
    }

  ngOnInit(): void {
    this.initMap();
  }
  private markFormGroupTouched(formGroup: FormGroup) {
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

  addRequestForm(form,verify){
     
    this.markFormGroupTouched(form);
    let formValues = form.value;
    formValues['pagelink'] = this.pagelink;
    if (form.valid) {
      this.requestService.sendRequest('master/requestLead/add', 'POST', formValues).subscribe(res => {
        if (res && res.status) {
          this.toastrService.success(res.message, 'Success');
          this.router.navigate(['/pages/thank-you']);
          form.reset();
        } 
      }, error => {
        console.log("PropertyDetailComponent -> addRequestForm -> error", error)
      })
    }

  }
  initMap() {


    // var map = new google.maps.Map(document.getElementById('map3'), {
    //   zoom: 4,
    //   center: myLatLng,
    //   mapTypeId: 'roadmap'
    // });

    // var marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    //   icon: 'img/marker_icon_map.png'
    // });
  }
}
