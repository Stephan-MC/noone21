import { Component, OnInit, Input, NgZone, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Observable, ObservableInput, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { ConsultationUrls } from 'src/app/masters/consultation/consultation-urls.enum';
import { deepCopy, removeEmptyKeysFromObject, changeDateFormat, markFormGroupTouched } from 'src/app/shared/utils/common-functions';
import { isObject } from 'lodash';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { mapping } from '../vendor-util';
@Component({
  selector: 'app-vendor-education',
  templateUrl: './vendor-education.component.html',
  styleUrls: ['./vendor-education.component.scss']
})
export class VendorEducationComponent implements OnInit {

 
  form: FormGroup;
  @Input() userId = null;
  @Input() singleUserObject = null;
  // disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;
  rows = [];
  rowsApproval=[];
  educationTypes = [];
  constructor(private fb: FormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private globalService: GlobalService,) {
    this.form = this.fb.group(this.formElements());
  }
  formElements(): Object {
    return {
      id: null,
      education_type_id: [null, Validators.required],
      title: [null, Validators.required],
      start_date: [''],
      end_date: [''],
      institute: [null],
      details: '',
      media_id: [],
      media: [],
      disabled: [false]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("DoctorCategoriesComponent -> ngOnChanges -> changes", changes);
    if (this.singleUserObject && isObject(this.singleUserObject)) {
      this.rows = this.singleUserObject['education'];
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  ngOnInit(): void {
    this.getEducationTypes();
    this.getApprovalEducation();
  }


  getEducationTypes() {
    this.requestService.sendRequest(CommonUrls.EDUCATION_TYPE_GET, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.educationTypes = res.result.data;
      } else {
        console.log(res.message);
      }
    }, error => {
      console.log("EditProfileComponent -> getEducationTypes -> error", error);
    })
  }
  public fileChangeEvent(fileInput: any) {
    let formData = new FormData();
    formData.append('media', fileInput.target.files[0]);
    this.uploadMedia(formData, 'education');

  }

  uploadMedia(formData, type = 'user') {
    // this.disableButton = true;
    this.requestService.sendRequest(CommonUrls.MEDIA_ADD, 'post', formData).subscribe(res => {
      // this.disableButton = false;
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        if (type == 'education') {
          this.form.get('media').setValue(res.result.data);
          this.form.get('media_id').setValue(res.result.data.id);
        }

      } else {
        // this.disableButton = false;
        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      // this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }
  editEducations(index) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      // this.toastr.error('Please enter information above');
      return;
    }
    let eObj = deepCopy(this.form.value);
    console.log("saveConsultations -> eObj", eObj);
    eObj.start_date = changeDateFormat(eObj.start_date);
    eObj.end_date = changeDateFormat(eObj.end_date);
    eObj['user_id'] = this.userId;
    // return;
    this.requestService.sendRequest(UserUrls.EDUCATION_PUT, 'put', removeEmptyKeysFromObject(eObj)).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.form.reset();
        this.editId = null;
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['education'];
          }
        }

        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  saveEducations(index) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      // this.toastr.error('Please enter information above');
      return;
    }
    let eObj = deepCopy(this.form.value);
    console.log("saveConsultations -> eObj", eObj);
    eObj.start_date = changeDateFormat(eObj.start_date);
    eObj.end_date = changeDateFormat(eObj.end_date);
    eObj['user_id'] = this.userId;
    // return;
    this.requestService.sendRequest(UserUrls.EDUCATION_POST, 'post', removeEmptyKeysFromObject(eObj)).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.form.reset();
        this.editId = null;
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['education'];
            this.getApprovalEducation();
          }
        }

        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  deleteEducations(item, index) {
    let eObj = deepCopy(item);
    console.log("deleteEducations -> eObj", eObj);
    // return;
    this.requestService.sendRequest(UserUrls.EDUCATION_DELETE, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.rows.splice(index, 1);
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');

    });
  }

  onEditClick(item) {
    this.form.patchValue(item);
    // this.sub_categories = item.sub_categories;
    this.editId = item.id;
    console.log("onEditClick -> this.editId ", this.editId)

  }
  delEduApproval(item, index) {
    let eObj = deepCopy(item);
    console.log("deleteEducations -> eObj", eObj);
    // return;
    this.requestService.sendRequest(UserUrls.EDUCATION_DELETE_APPROVAL, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.rowsApproval.splice(index, 1);
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');

    });
  }
    getApprovalEducation(){
        this.requestService.sendRequest(CommonUrls.GetEduApproval, 'GET', {id:this.userId}).subscribe(res => {
          if (res && res.status) {
            this.rowsApproval = res.result.data;
            console.log('approval data'+this.rowsApproval);
          } else {
            console.log(res.message);
          }
        }, error => {
          console.log("EditProfileComponent -> getEducationTypes -> error", error);
        })
    }
}
