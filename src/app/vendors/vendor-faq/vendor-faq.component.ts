import { Component, OnInit, Input, NgZone, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Subject, ObservableInput, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, catchError } from 'rxjs/operators';
import { isEmptyObject, findFromArrayOFObjects, markFormGroupTouched, deepCopy, getIdsFromArray, makeDeepCopyArray, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { ConditionTreatedUrls } from 'src/app/masters/conditions-treated/condition-treated-urls.enum';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { isObject } from 'lodash';
import { FaqUrls } from 'src/app/masters/faq-master/faq-urls.enum';
import { mapping } from '../vendor-util';
@Component({
  selector: 'app-vendor-faq',
  templateUrl: './vendor-faq.component.html',
  styleUrls: ['./vendor-faq.component.scss']
})
export class VendorFaqComponent implements OnInit {

  form: FormGroup;
  @Input() userId = null;
  @Input() singleUserObject = null;
  disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;
  rows = [];
  constructor(private fb: FormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private globalService: GlobalService) {
    this.form = this.fb.group(this.formElements());
  }

  formElements() {
    return {
      id: null,
      question: [null, Validators.required],
      answer: [null, Validators.required],
      disabled: [false]
    }
  }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("DoctorCategoriesComponent -> ngOnChanges -> changes", changes);
    if (this.singleUserObject && isObject(this.singleUserObject)) {
      this.rows = this.singleUserObject['faqs'];
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  clear(form) {
    form.get('answer').setValue('');
  }

  searchFAQ = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchFailed = true),
      switchMap(term =>
        term.length <= 2 ? this.returnEmpty() : this.doApiCall(FaqUrls.ALL_GET, { search: term })
      ),
      tap(() => this.searchFailed = false)
    )
  faqFormatter = (x: { question: string }) => x.question;

  doApiCall(url, data): ObservableInput<any[]> {
    console.log("SkillFormComponent -> data", data)

    return <any>this.requestService.sendRequest(url, 'get', data)
      .pipe(
        tap(() => this.searchFailed = false),
        map((res) => {
          if (res['result']['data'].length == 0) {
            this.showNotFoundMessage();
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


  selectedItemFAQ(selected, item) {
    // this.clickedItem = selected.item;
    console.log(selected.item);
    item.get('answer').setValue(selected.item.answer);
  }

  editFAQ(index) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      // this.toastr.error('Please enter information above');
      return;
    }
    let cObj = deepCopy(this.form.value);
    // console.log("saveConsultations -> eObj", eObj);
    // eObj.start_date = changeDateFormat(eObj.start_date);
    // eObj.end_date = changeDateFormat(eObj.end_date);
    // eObj['user_id'] = this.userId;
    // return;

    let formData = {
      id: cObj.id,
      faq_id: isObject(cObj.question) ? cObj.question.id : cObj.question,
      answer: cObj.answer,
      user_id: this.userId,
    }
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.FAQ_PUT, 'put', removeEmptyKeysFromObject(formData)).subscribe(res => {
      console.log("saveConsultations -> res", res);
      this.disableButton = false;
      if (res && res.status) {
        this.form.reset();
        this.editId = null;
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['faqs'];
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

  saveFAQ(index) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      // this.toastr.error('Please enter information above');
      return;
    }
    let cObj = deepCopy(this.form.value);
    let formData = {
      faq_id: isObject(cObj.question) ? cObj.question.id : cObj.question,
      user_id: this.userId,
      answer: cObj.answer
    }
    if (cObj.id) {
      formData['id'] = cObj.id;
    }
    if (!isObject(cObj.question)) {
      this.toastr.error('Please select valid question');
      return false;
    }
    console.log("saveConsultations -> cObj", cObj);

    // return;
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.FAQ_POST, 'post', formData).subscribe(res => {
      console.log("saveConsultations -> res", res);
      this.disableButton = false;
      if (res && res.status) {
        this.form.reset();
        this.editId = null;
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['faqs'];
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
  onEditClick(item) {
    this.form.patchValue(item);
    // this.sub_categories = item.sub_categories;
    this.editId = item.id;
    console.log("onEditClick -> this.editId ", this.editId)

  }

  deleteFAQ(item, index) {
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.FAQ_DELETE, 'delete_with_body', { ids: [item.id] }).subscribe(res => {
      if (res && res.status) {
        this.disableButton = false;
        this.rows.splice(index, 1);
        this.editId = null;
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


  toggleWithGreeting(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }

}
