import { Component, OnInit, Input, NgZone, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isEmptyObject, findFromArrayOFObjects, markFormGroupTouched, deepCopy, getIdsFromArray, makeDeepCopyArray } from 'src/app/shared/utils/common-functions';
import { ConditionTreatedUrls } from 'src/app/masters/conditions-treated/condition-treated-urls.enum';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { isObject } from 'lodash';
import { ServicesUrls } from 'src/app/masters/services-master/services-urls.enum';
import { mapping } from '../vendor-util';
import * as _ from 'lodash';
@Component({
  selector: 'app-vendor-services',
  templateUrl: './vendor-services.component.html',
  styleUrls: ['./vendor-services.component.scss']
})
export class VendorServicesComponent implements OnInit {
  form: FormGroup;
  @Input() userId = null;
  @Input() singleUserObject = null;
  disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;
  rows = [];
  services = [];
  serviceDropdown = [];
  modelChangedService: Subject<Object> = new Subject<Object>();
  readonly separatorKeysCodes: number[] = [];
  constructor(private fb: FormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private globalService: GlobalService,) {
    this.form = this.fb.group(this.formElements());
  }

  ngOnInit(): void {
    this.searchServices();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("DoctorCategoriesComponent -> ngOnChanges -> changes", changes);
    if (this.singleUserObject && isObject(this.singleUserObject)) {
      // this.rows = makeDeepCopyArray(this.singleUserObject['services']);
      this.services = makeDeepCopyArray(this.singleUserObject['services']);
      this.form.patchValue(this.singleUserObject);
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  formElements(): Object {
    return {
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(emailRegEx)]],
      service_id: null
    }
  }

  changedService(item, text: string) {
    this.modelChangedService.next({ text: text });
  }

  searchServices() {
    // Debounce search.
    this.modelChangedService.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe((value: any) => {
        console.log("searchSubCategories -> value", value);
        if (!isEmptyObject(value)) {
          if (value) {
            this.getValuesService(value);
          }

        }

      });

  }

  getValuesService(obj) {
    console.log("HeaderComponent -> getValues -> search", obj);
    this.requestService.sendRequest(ServicesUrls.ALL_GET, 'GET', { search: obj.text }).subscribe(res => {
      if (res.status) {
        this.serviceDropdown = res.result.data;
      } else {
        this.serviceDropdown = [];
      }
    }, error => {
      console.log("getValues -> error", error);
      this.serviceDropdown = [];
    });
  }
  removeService(list, current): void {
    const index = list.indexOf(current);

    if (index >= 0) {
      list.splice(index, 1);
      this.serviceDropdown = [];
      // this.masterForm.controls['insurance_name'].setValue(list);
    }

  }

  selectionMadeService(event: Event, trigger: MatAutocompleteTrigger, selected, item, index) {
    console.log("selectionMade -> item", item)
    console.log("selectionMade -> selected", selected)
    this.serviceDropdown = [];

    let found = findFromArrayOFObjects(this.services, 'id', selected.id);
    if (!found) {
      this.services.push(selected);
    }

    item.get('service_id').setValue(null);
    this.modelChangedService.next({});
    event.stopPropagation();
  }

  onSubmit() {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      return;
    }
    if (this.services.length == 0) {
      this.toastr.error('please select at least one condition treated');
      return false;
    }
    console.log('value', this.form.getRawValue());
    let form = deepCopy(this.form.getRawValue());
    const array3 = [...this.rows, ...this.services];
    console.log("onSubmit -> array3", array3)
    form['service_ids'] = _.uniq(getIdsFromArray(array3, 'id'));
    // form['service_ids'] = getIdsFromArray(array3, 'id');
    form['id'] = this.userId;
    // form['profile_media_id'] = 2;
    this.disableButton = true;
    if (this.userId) {
      this.requestService.sendRequest(UserUrls.UPDATE_PUT, 'PUT', form).subscribe(res => {
        this.disableButton = false;
        if (res && res.status) {
          // this.services = [];
          this.globalService.userUpdate$.next(res.result.data);
          this.toastr.success(res.message, 'Success');
          if (res.result.data) {
            this.singleUserObject = mapping(res.result.data);
            if (this.singleUserObject && isObject(this.singleUserObject)) {
              // this.rows = this.singleUserObject['services'];
              this.services = this.singleUserObject['services'];
            }
          }
        } else {

          this.toastr.error(res.message, 'Error');

        }
      }, error => {
        this.disableButton = false;
        console.log("LoginComponent -> submit -> error", error);
        this.toastr.error(error.error ? error.error.message : error.message, 'success');

      });

    }
  }

}
