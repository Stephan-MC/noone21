import { Component,OnInit, Input, NgZone, SimpleChanges, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder,FormControl, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
// import * as $ from "jquery";
import { GlobalService } from 'src/app/shared/services/global.service';
import { Subject, ObservableInput, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, catchError } from 'rxjs/operators';
import { isEmptyObject, findFromArrayOFObjects, markFormGroupTouched, deepCopy, getIdsFromArray, makeDeepCopyArray, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { ConditionTreatedUrls } from 'src/app/masters/conditions-treated/condition-treated-urls.enum';
import { MatLegacyAutocompleteTrigger as MatAutocompleteTrigger } from '@angular/material/legacy-autocomplete';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { isObject } from 'lodash';
import { FaqUrls } from 'src/app/masters/faq-master/faq-urls.enum';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';

import { mapping } from '../vendor-util';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-video-galary',
  templateUrl: './video-galary.component.html',
  styleUrls: ['./video-galary.component.scss']
})

export class VideoGalaryComponent implements OnInit{
  
  _iframe_html=[];
  _iframe_html_approval=[];
  html_video: any;
  form: UntypedFormGroup;
  @Input() userId = null;
  @Input() VidUserObject = null;
  disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;
  rows = [];
  videos=[];
  videosApproval=[];
  selectedFiles: FileList;
  constructor(private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private embedService: EmbedVideoService,
    private globalService: GlobalService) {
    this.form = this.fb.group(this.formElements());
    this.userId = this.localStorage.getObject('user_details').id;
 
   
  }
  imageSrc: string;
 AfterViewInit(): void{
 
}
TestMthod(item){
  console.log(item);
}
EmbedVideoApproval(){
  this._iframe_html_approval=[];
  this.videosApproval.forEach(element => {
    this._iframe_html_approval.push(
          {
            emedVidoeApproval:this.embedService.embed(element.video_link,
                                              {
                                              query: { portrait: 0, color: '333'},
                                              attr: { height: 200 }
                                            }
            ),
            itemObj:element
          }
      );
  });
 
}
EmbedVideo(){
  this._iframe_html=[];
  this.videos.forEach(element => {
    this._iframe_html.push(
          {
            emedVidoe:this.embedService.embed(element.video_link,
                                              {
                                              query: { portrait: 0, color: '333'},
                                              attr: { height: 200 }
                                            }
            ),
            itemObj:element
          }
      );
  });
 
}
  formElements() {
    return {
      videoLink: ['', Validators.required],
      disabled: [false]
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileod = (event.target as HTMLInputElement).files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          media: fileod
        });
        
      };
    }
  }
  submit(){
    var formData: any = new FormData();
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      // this.toastr.error('Please enter information above');
      return;
    }
    formData.append("user_id",  this.userId);
    formData.append("videoLink", this.form.get('videoLink').value);
    this.requestService.sendRequest(UserUrls.Video_Galary, 'post', formData).subscribe(res => {
      this.disableButton = false;
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        this.GetVideo(this.userId);
        this.GetVideoApproval(this.userId);
        
        this.form.reset();
      }else {
        this.disableButton = false;
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
 
  ngOnInit(): void {
    this.GetVideo(this.userId);
   
  }
  ngAfterContentInit():void{
    this.GetVideoApproval(this.userId);
  }
  DelVidApproval(item){
    let eObj = deepCopy(item);
    this.requestService.sendRequest(UserUrls.Video_Delete_Approval, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        this.GetVideoApproval(this.userId);
        this.EmbedVideoApproval();
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });
  }
 DeleteVideo(item){
  let eObj = deepCopy(item);
  this.requestService.sendRequest(UserUrls.Video_Delete, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
    console.log("saveConsultations -> res", res);
    if (res && res.status) {
      this.toastr.success(res.message, 'Success');
      this.GetVideo(this.userId);
      this.EmbedVideo();
    } else {
      this.toastr.error(res.message, 'Error');
    }
  }, error => {
    console.log("LoginComponent -> submit -> error", error);
    this.toastr.error(error.error ? error.error.message : error.message, 'Error');
  });
 }
 GetVideoApproval(id){
  this.requestService.sendRequest(UserUrls.VidSingleApporval + id, 'GET', {}).subscribe(res => {
    if (res && res.status) {
      if (res.result.data) {
         this.videosApproval = res.result.data;
         this.EmbedVideoApproval();

      }
    }else {
      this.toastr.error(res.message, 'Error');
    }
  }, error => {
    console.log("video compontent -> submit -> error", error);
    this.toastr.error(error.error ? error.error.message : error.message, 'success');

  });
 }
 
  GetVideo(id){
    this.requestService.sendRequest(UserUrls.Video_Single_Galary + id, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        if (res.result.data) {
           this.videos = res.result.data;
           
           this.EmbedVideo();

        }
      }else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("video compontent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

}
