import { Component, OnInit, Input, NgZone, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Observable, ObservableInput, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { ConsultationUrls } from 'src/app/masters/consultation/consultation-urls.enum';
import { deepCopy, removeEmptyKeysFromObject, markFormGroupTouched } from 'src/app/shared/utils/common-functions';
import { isObject } from 'lodash';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { mapping } from '../vendor-util';
@Component({
  selector: 'app-vendor-consultation',
  templateUrl: './vendor-consultation.component.html',
  styleUrls: ['./vendor-consultation.component.scss']
})
export class VendorConsultationComponent implements OnInit {

  form: UntypedFormGroup;
  @Input() userId = null;
  @Input() singleUserObject = null;
  disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;
  rows = [];
  constructor(private fb: UntypedFormBuilder,
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
      consultation_id: [null, Validators.required],
      charges: ['', Validators.required],
      id: ''
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("DoctorCategoriesComponent -> ngOnChanges -> changes", changes);
    if (this.singleUserObject && isObject(this.singleUserObject)) {
      this.rows = this.singleUserObject['consultations'];
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  ngOnInit(): void {
  }
  searchConsultation = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchFailed = true),
      switchMap(term =>
        term.length <= 2 ? this.returnEmpty() : this.doApiCall(ConsultationUrls.ALL_GET, { search: term })
      ),
      tap(() => this.searchFailed = false)
    )
  consultationFormatter = (x: { name: string }) => x.name;

  doApiCall(url, data): ObservableInput<any[]> {
    console.log("SkillFormComponent -> data", data)

    return <any>this.requestService.sendRequest(url, 'get', data)
      .pipe(
        tap(() => this.searchFailed = false),
        map((res) => {
          if (res['result']['data'].length == 0) {
            this.showNotFoundMessage();
          }
          if (data && data['type'] == 'category') {
            // let id_filter = this.categoryArray.value.map(a => isObject(a.category) ? a.category.id : null).filter(Boolean);
            // let result = res['result']['data'].filter((o) => !id_filter.includes(+o.id));
            let result = res['result']['data']
            console.log("result", result);
            return result;
            console.log('category array');
          }
          return res['result']['data']
        }),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))

  }
  showNotFoundMessage() {
    this.toastr.error('No record Found');
  }
  returnEmpty() {
    return of([]);
  }

  saveConsultations(index) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      return;
    }
    let cObj = deepCopy(this.form.value)
    let formData = {
      consultation_id: isObject(cObj.consultation_id) ? cObj.consultation_id.id : cObj.consultation_id,
      charges: parseFloat(cObj.charges),
      user_id: this.userId
    }
    if (this.editId) {
      formData['id'] = this.editId;
    }
    if (!isObject(cObj.consultation_id)) {
      this.toastr.error('Please select valid consultation');
      return false;
    }
    console.log("saveConsultations -> cObj", cObj);

    // return;
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.CONSULTATION_POST, 'post', formData).subscribe(res => {
      console.log("saveConsultations -> res", res);
      this.disableButton = false;
      if (res && res.status) {
        this.form.reset();
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['consultations'];
          }
        }

        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  editConsultation(index) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      return;
    }
    let cObj = deepCopy(this.form.value)
    let formData = {
      id: cObj.id,
      consultation_id: isObject(cObj.consultation_id) ? cObj.consultation_id.id : cObj.consultation_id,
      charges: parseFloat(cObj.charges),
      user_id: this.userId
    }
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.CONSULTATION_PUT, 'put', removeEmptyKeysFromObject(formData)).subscribe(res => {
      console.log("saveConsultations -> res", res);
      this.disableButton = false;
      if (res && res.status) {
        this.form.reset();
        this.editId = null;
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['consultations'];
          }
        }

        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  deleteConsultations(item, index) {
    let eObj = item
    console.log("deleteEducations -> eObj", eObj);
    // return;
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.CONSULTATION_DELETE, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
      if (res && res.status) {
        this.disableButton = false;
        this.rows.splice(index, 1);
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  onEditClick(item) {
    this.form.patchValue(item);
    // this.sub_categories = item.sub_categories;
    this.editId = item.id;
    console.log("onEditClick -> this.editId ", this.editId)

  }

}
