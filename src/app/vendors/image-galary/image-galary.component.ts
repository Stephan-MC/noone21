import { Component, OnInit, Input, NgZone, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
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
import { mapping } from '../vendor-util';
import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'app-image-galary',
  templateUrl: './image-galary.component.html',
  styleUrls: ['./image-galary.component.scss']
})
export class ImageGalaryComponent implements OnInit {
  form: UntypedFormGroup;
  _albums = [];
  _albums_approval = [];
  @Input() userId = null;
  @Input() singleUserObject = null;
  disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;
  rows = [];
  Images=[];
  ImagesApproval=[];
  imageSrc=null;
  constructor(private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _lightbox: Lightbox,
    private globalService: GlobalService) {
    this.form = this.fb.group(this.formElements());
  
  }
 
  formElements() {
      return {
        id: null,
        disabled: [false]
      }
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index,{
      wrapAround: true, 
      showImageNumberLabel: true ,
      showRotate: true,
      alwaysShowNavOnTouchDevices: true,
      showZoom: true

    });
  }

  remove(){
      console.log('onk');
  }
  public fileChangeEvent(fileInput: any) {
    let formData = new FormData();
    formData.append('media', fileInput.target.files[0]);
    formData.append('user_id', this.userId);
    this.uploadMedia(formData, 'education');

  }
  DImgApproval(id){
    
    this.requestService.sendRequest(UserUrls.Image_Delete_approval, 'delete_with_body', { ids: id }).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        this.GetImageApproval(this.userId);
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
  
    });
  }
  uploadMedia(formData, type = 'user') {
    this.requestService.sendRequest(UserUrls.Image_Galary_Add, 'post', formData).subscribe(res => {
      if (res && res.status) {
        this.GetImage(this.userId);
        this.GetImageApproval(this.userId);
        this.toastr.success(res.message, 'Success');
      }else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
  EmbedLightBoxImageApproval(){
    this._albums_approval=[];
    this.ImagesApproval.forEach(element => {
      this._albums_approval.push({ 
                  src: element.base_path +'/'+ element.system_name , 
                  thumb: element.base_path +'/'+ element.system_name,
                  modelId:element.id
                 },
        );
    });
   
  }
  EmbedLightBoxImage(){
    this._albums=[];
    this.Images.forEach(element => {
      this._albums.push({ 
        src: element.base_path +'/'+ element.system_name , 
        thumb: element.base_path +'/'+ element.system_name,
        modelId:element.id
                 },
        );
    });
   
  }
  DeleteImage(id){
    // let eObj = deepCopy(item);
    this.requestService.sendRequest(UserUrls.Image_Delete, 'delete_with_body', { ids: id }).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        this.GetImage(this.userId);
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
  
    });
   }

   GetImageApproval(id){
    this.requestService.sendRequest(UserUrls.ImgSingleApproval + id, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        if (res.result.data) {
           this.ImagesApproval = res.result.data;
           this.EmbedLightBoxImageApproval();
        }
      }else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("Images compontent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
   }
  GetImage(id){
    this.requestService.sendRequest(UserUrls.Image_Single_Galary + id, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        if (res.result.data) {
           this.Images= res.result.data;
           this.EmbedLightBoxImage();
          //  this.GetImageApproval(this.userId);
        }
      }else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("Images compontent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
  ngOnInit(): void {
  
    
  }
  ngAfterViewInit(): void{
    this.GetImage(this.userId);
    this.GetImageApproval(this.userId);
  }

}
