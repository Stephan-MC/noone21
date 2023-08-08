import { Component, OnInit, Input, NgZone, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isEmptyObject, findFromArrayOFObjects, markFormGroupTouched, deepCopy, getIdsFromArray, makeDeepCopyArray } from 'src/app/shared/utils/common-functions';
import { ConditionTreatedUrls } from 'src/app/masters/conditions-treated/condition-treated-urls.enum';
import { MatLegacyAutocompleteTrigger as MatAutocompleteTrigger } from '@angular/material/legacy-autocomplete';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { isObject } from 'lodash';
import { mapping } from '../vendor-util';
import * as _ from 'lodash';
@Component({
  selector: 'app-vendor-condition-treated',
  templateUrl: './vendor-condition-treated.component.html',
  styleUrls: ['./vendor-condition-treated.component.scss']
})
export class VendorConditionTreatedComponent implements OnInit {

  form: UntypedFormGroup;
  @Input() userId = null;
  @Input() singleUserObject = null;
  disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;
  rows = [];
  services = [];
  serviceDropdown = [];
  modelChangedConditionTreated: Subject<Object> = new Subject<Object>();
  conditionTreatedDropdown = [];
  conditionTreated = [];
  readonly separatorKeysCodes: number[] = [];
  constructor(private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private globalService: GlobalService,) {
    this.form = this.fb.group(this.formElements());
  }

  ngOnInit(): void {
    this.searchConditionTreated();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("DoctorCategoriesComponent -> ngOnChanges -> changes", changes);
    if (this.singleUserObject && isObject(this.singleUserObject)) {
      // this.rows = makeDeepCopyArray(this.singleUserObject['condition_treated']);
      this.conditionTreated = makeDeepCopyArray(this.singleUserObject['condition_treated']);
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
      condition_treated_id: null
    }
  }
  changedConditionTreated(item, text: string) {
    this.modelChangedConditionTreated.next({ text: text });
  }
  onEditClick(item) {
    this.form.patchValue(item);
    this.conditionTreated = item;
    this.editId = item.id;
    console.log("onEditClick -> this.editId ", this.editId)

  }

  searchConditionTreated() {
    // Debounce search.
    this.modelChangedConditionTreated.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe((value: any) => {
        console.log("searchSubCategories -> value", value);
        if (!isEmptyObject(value)) {
          if (value) {
            this.getValuesConditionTreated(value);
          }

        }

      });

  }

  getValuesConditionTreated(obj) {
    console.log("HeaderComponent -> getValues -> search", obj);
    this.requestService.sendRequest(ConditionTreatedUrls.ALL_GET, 'GET', { search: obj.text }).subscribe(res => {
      if (res.status) {
        this.conditionTreatedDropdown = res.result.data;
      } else {
        this.conditionTreatedDropdown = [];
      }
    }, error => {
      console.log("getValues -> error", error);
      this.conditionTreatedDropdown = [];
    });
  }

  removeConditionTreated(list, current): void {
    const index = list.indexOf(current);

    if (index >= 0) {
      list.splice(index, 1);
      this.conditionTreatedDropdown = [];
      // this.masterForm.controls['insurance_name'].setValue(list);
    }

  }

  selectionMadeConditionTreated(event: Event, trigger: MatAutocompleteTrigger, selected, item, index) {
    console.log("selectionMade -> item", item)
    console.log("selectionMade -> selected", selected)
    this.conditionTreatedDropdown = [];

    let found = findFromArrayOFObjects(this.conditionTreated, 'id', selected.id);
    if (!found) {
      this.conditionTreated.push(selected);
    }

    item.get('condition_treated_id').setValue(null);
    this.modelChangedConditionTreated.next({});
    event.stopPropagation();
  }

  onSubmit() {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      return;
    }
    if (this.conditionTreated.length == 0) {
      this.toastr.error('please select at least one condition treated');
      return false;
    }
    console.log('value', this.form.getRawValue());
    let form = deepCopy(this.form.getRawValue());
    const array3 = [...this.rows, ...this.conditionTreated];
    form['condition_treated_ids'] = _.uniq(getIdsFromArray(array3, 'id'));
    // form['condition_treated_ids'] = _.uniq[getIdsFromArray(array3, 'id')];
    form['id'] = this.userId;
    // form['profile_media_id'] = 2;
    this.disableButton = true;
    if (this.userId) {
      this.requestService.sendRequest(UserUrls.UPDATE_PUT, 'PUT', form).subscribe(res => {
        this.disableButton = false;
        if (res && res.status) {
         
          this.globalService.userUpdate$.next(res.result.data);
          this.toastr.success(res.message, 'Success');
          // this.conditionTreated = [];
          if (res.result.data) {
            this.singleUserObject = mapping(res.result.data);
            if (this.singleUserObject && isObject(this.singleUserObject)) {
              // this.rows = this.singleUserObject['condition_treated'];
              this.conditionTreated = this.singleUserObject['condition_treated'];
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
