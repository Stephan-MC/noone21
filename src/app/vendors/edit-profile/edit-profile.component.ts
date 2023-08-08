import { Component, OnInit, NgZone,Input,ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup,FormsModule,UntypedFormBuilder, Validators, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { ToastrService } from 'ngx-toastr';
import { deepCopy, removeObjectProperties, removeEmptyKeysFromObject, changeDateFormat, getIdsFromArray, findFromArrayOFObjects, findIndexInData, LooseObject, isEmptyObject, availabilities, markFormGroupTouched } from 'src/app/shared/utils/common-functions';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { GlobalService } from 'src/app/shared/services/global.service';
import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, ObservableInput, Subject, Subscription } from 'rxjs';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { isObject } from 'util';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { ConsultationUrls } from 'src/app/masters/consultation/consultation-urls.enum';
import { SkillUrls } from 'src/app/masters/skills/skill-urls.enum';
import { MapsAPILoader } from '@agm/core';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { SharedUrls } from 'src/app/shared/utils/shared-urls.enum';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ReviewUrls } from 'src/app/reviews/review-urls.enum';
import { ServicesUrls } from 'src/app/masters/services-master/services-urls.enum';
import { ConditionTreatedUrls } from 'src/app/masters/conditions-treated/condition-treated-urls.enum';
import { FaqUrls } from 'src/app/masters/faq-master/faq-urls.enum';

declare var google;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  
  form: UntypedFormGroup;
  myForm: UntypedFormGroup;
  htmlContent: any;
  userId: number = 0;;
  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  disableButton = false;

  cities = [];
  selectedItems = [];
  countries = [];
  educationTypes = [];
  Skills = [];
  consultations = [];

  singleUserObject = null;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: this.ShowFilter
  };

  categorySkillObj: LooseObject = {
    subCategoriesArray: []
  };

  modelChanged: Subject<Object> = new Subject<Object>();
  modelChangedService: Subject<Object> = new Subject<Object>();
  modelChangedConditionTreated: Subject<Object> = new Subject<Object>();
  searching = false;
  searchFailed = false;
  readonly separatorKeysCodes: number[] = [];
  subscription: Subscription[] = [];
  removable = true;

  @ViewChild(MapModalComponent, { static: true }) mapModal: MapModalComponent;

  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  address: Address = new Address();
  public latitude: number;
  public longitude: number
  public zoom: number;
  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name',
    neighborhood: 'long_name'
  };

  approvals = [];
  comments = '';
  reviews = [];
  services = [];
  serviceDropdown = [];

  conditionTreated = [];
  conditionTreatedDropdown = [];

  availabilities = availabilities;
  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private loaderService: LoaderService
  ) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.form = this.fb.group(this.formElements());
  }

  ngOnInit(): void {
   
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.globalService.countries$.subscribe(res => {
      if (res && Array.isArray(res)) {
        this.countries = res;
      }
    })
    this.searchAddress();
    this.userId = this.localStorage.getObject('user_details').id;
    // this.getUser(this.userId);
    this.getEducationTypes();
    // this.getConsultations();
    // this.getSkills();
    this.searchSubCategories();
    this.searchServices();
    this.searchConditionTreated();
   
  }


  private newMethod(): any {
    return '#editor';
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

  getSkills() {
    this.Skills = [
    ];
    this.requestService.sendRequest(CommonUrls.SKILL_GET, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.Skills = [...res.result.data];
        // console.log("getSkills -> this.Skills", this.Skills)
      } else {
        console.log(res.message);
      }
    }, error => {
      console.log("EditProfileComponent -> getEducationTypes -> error", error);
    })
  }

  getConsultations() {
    this.requestService.sendRequest(CommonUrls.CONSULTATION_GET, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.consultations = res.result.data;
      } else {
        console.log(res.message);
      }
    }, error => {
      console.log("EditProfileComponent -> getEducationTypes -> error", error);
    })
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  check(v) {
    console.log("EditProfileComponent -> check -> v", v)
    return true
  }

  formElements(): Object {
    return {
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(emailRegEx)]],
      'address': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'zip': ['', [Validators.required]],
      'country': [null, [Validators.required]],
      'facebook_link': [''],
      'google_link': [''],
      'twitter_link': [''],
      'pinterest_link': [''],
      'about_me': [''],
      'lat': ['', [Validators.required]],
      'lng': ['', [Validators.required]],
      'phone_no': ['', [Validators.required]],
      'skill': [null],
      'profile_media_id': [''],
      'service_id': [''],
      'condition_treated_id': [''],
      'availability': [null],
      'price': [''],
      'avg_wait_time': [''],
      'user_id':[''],
      'avg_consultation_time': [''],
      'consultation': this.fb.array([this.addConsultationFee()]),
      'education': this.fb.array([this.createEducation()]),
      'user_faq': this.fb.array([this.createFAq()]),
      'user_categories': this.fb.array([this.createCategory()]),
    }
  }

  addConsultationFee() {
    return this.fb.group({
      consultation_id: null,
      charges: '',
      id: ''
    })
  }


  addFee() {
    this.consultationFeeArray.push(this.addConsultationFee());

  }

  moveto(array, slug) {
    let id = <any>slug + (array.value.length - 1);
    setTimeout(() => {
      if (document.getElementById(id)) {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }


  get consultationFeeArray() {
    return this.form.get('consultation') as UntypedFormArray;
  }

  removeConsultationFee(i) {
    (this.consultationFeeArray as UntypedFormArray).removeAt(i);
  }

  createEducation() {
    return this.fb.group({
      id: null,
      education_type_id: null,
      title: '',
      start_date: '',
      end_date: '',
      institute: '',
      details: '',
      media_id: [],
      media: [],
      disabled: [false]
    })
  }
  createFAq() {
    return this.fb.group({
      id: null,
      question: null,
      answer: '',
      disabled: [false]
    })
  }

  createCategory() {
    return this.fb.group({
      id: null,
      category: null,
      sub_category: null,
      sub_categories: [[]],
      media_id: null,
      disabled: [false]
    })
  }
  addCategory() {
    this.categoryArray.push(this.createCategory());
  }

  get categoryArray() {
    return this.form.get('user_categories') as UntypedFormArray;
  }

  addFAQ() {
    this.faqArray.push(this.createFAq());
  }

  get faqArray() {
    return this.form.get('user_faq') as UntypedFormArray;
  }

  removeFAQ(i) {
    (this.faqArray as UntypedFormArray).removeAt(i);
  }

  removeCategory(i) {
    (this.categoryArray as UntypedFormArray).removeAt(i);
  }


  addEducation() {
    this.educationArray.push(this.createEducation());
  }


  get educationArray() {
    return this.form.get('education') as UntypedFormArray;
  }

  removeEducation(i) {
    (this.educationArray as UntypedFormArray).removeAt(i);
  }

  public fileChangeEvent(fileInput: any, index) {
    const control = this.form.get(['education', index, 'disabled']) as UntypedFormControl;
    control.patchValue(true);
    let formData = new FormData();
    formData.append('media', fileInput.target.files[0]);
    this.uploadMedia(formData, 'education', index);

  }

  public fileChangeEventCat(fileInput: any, index) {
    const control = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
    control.patchValue(true);
    let formData = new FormData();
    formData.append('media', fileInput.target.files[0]);
    this.uploadMedia(formData, 'category', index);

  }

  public fileChangeEventProfile(fileInput: any) {
    console.log("EditProfileComponent -> fileChangeEventProfile -> fileInput", fileInput);
    let formData = new FormData();
    formData.append('media', fileInput.target.files[0]);
    this.uploadMedia(formData, 'user');

  }

  removeFie(currentForm, i) {
    let arr = currentForm.value.media;
    arr.splice(i, 1);
    currentForm.get('media').setValue(arr);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onSubmit() {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      return;
    }
    console.log('value', this.form.getRawValue());
    let form = deepCopy(this.form.getRawValue());
    if (!form.lat && !form.lng) {
      this.toastr.error('please search a valid address,Latitude and longitude are exist against this address');
      return false;
    }
    let removeProps = ['skill', 'education', 'consultation', 'user_categories'];
    form = removeObjectProperties(form, removeProps);
    form['service_ids'] = getIdsFromArray(this.services, 'id');
    form['condition_treated_ids'] = getIdsFromArray(this.conditionTreated, 'id');
    form['id'] = this.userId;
    // form['profile_media_id'] = 2;
    this.disableButton = true;
    if (this.userId) {
      this.requestService.sendRequest(UserUrls.UPDATE_PUT, 'PUT', form).subscribe(res => {
        this.disableButton = false;
        if (res && res.status) {
          this.globalService.userUpdate$.next(res.result.data);
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
  }

  getUser(id) {
    this.requestService.sendRequest(UserUrls.SINGLE_GET + id, 'GET', {}).subscribe(res => {
      this.disableButton = false;
      if (res && res.status) {
        let self = this;
        this.singleUserObject = res.result.data;
        this.educationArray;;
        this.consultationFeeArray;;
        this.categoryArray;;
        this.faqArray;;
        if (res.result.data.education.length == 0) {
          this.addEducation()
        } else {
          res.result.data.education.forEach(element => {
            this.addEducation();
          });
        }

        if (res.result.data.faqs.length == 0) {
          this.addFAQ()
        } else {
          res.result.data.faqs.forEach(element => {
            this.addFAQ();
          });
        }
        if (res.result.data.consultations.length == 0) {
          this.addFee()
        } else {
          res.result.data.consultations.forEach(element => {
            element['consultation_id'] = { consultation_id: element['consultation_id'], name: element['name'], id: element['consultation_id'] };
            // element['charges'] = element.pivot['charges'] ? element.pivot['charges'] : 0;
            this.addFee();
          });
        }

        if (res.result.data.categories.length == 0) {
          this.addCategory()
        } else {
          let self = this;
          res.result.data.categories.forEach(obj => {
            self.addCategory()
            obj.category = { id: null, name: null };
            obj.category.id = obj.category_id;
            obj.category.name = obj.category_name;
            obj.id = self.create_UUID();
            obj.sub_categories.forEach(sObj => {
              sObj.id = sObj.sub_category_id;
              sObj.name = sObj.sub_category_name
            });
          });
        }

        res.result.data.user_categories = res.result.data.categories;
        res.result.data.consultation = res.result.data.consultations;

        res.result.data.faqs.forEach(element => {
          // element['id'] = element.faq_id;
          let qO = { id: element.faq_id, question: element.question, answer: element.answer }
          // qO.question = element;
          element.question = qO;
        });
        res.result.data.user_faq = res.result.data.faqs;
        console.log("getUser -> res.result.data.user_faq ", res.result.data.user_faq)
        this.services = res.result.data.services;
        this.conditionTreated = res.result.data.condition_treated;
        // res.result.data.skills.forEach(element => {
        //   element['id'] = element['skill_id'];
        // });
        // res.result.data.skill = res.result.data.skills;
        this.form.patchValue(res.result.data)
        console.log('single user', this.form.getRawValue());
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  uploadMedia(formData, type = 'user', index = 0) {
    this.disableButton = true;
    this.requestService.sendRequest(CommonUrls.MEDIA_ADD, 'post', formData).subscribe(res => {
      this.disableButton = false;
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        this.form.patchValue(res.result.data);
        if (type == 'user') {
          this.form.get('profile_media_id').setValue(res.result.data.id);
          this.singleUserObject['profile_media'] = res.result.data;
        }
        if (type == 'education') {
          const controlDisabled = this.form.get(['education', index, 'disabled']) as UntypedFormControl;
          controlDisabled.patchValue(false);
          const control = this.form.get(['education', index, 'media_id']) as UntypedFormControl;
          control.patchValue(res.result.data.id);
          console.log('test');
          const controlMedia = this.form.get(['education', index, 'media']) as UntypedFormControl;
          controlMedia.patchValue(res.result.data);
        }
        if (type == 'category') {
          const controlDisabled = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
          controlDisabled.patchValue(false);
          const control = this.form.get(['user_categories', index, 'media_id']) as UntypedFormControl;
          control.patchValue(res.result.data.id);
        }
      } else {
        this.disableButton = false;
        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  saveConsultations(index) {

    let cObj = deepCopy(this.consultationFeeArray.value)[index];
    let formData = {
      consultation_id: isObject(cObj.consultation_id) ? cObj.consultation_id.id : cObj.consultation_id,
      charges: parseFloat(cObj.charges),
      user_id: this.userId
    }
    if (cObj.id) {
      formData['id'] = cObj.id;
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
        this.toastr.success(res.message, 'Success');
        const control = this.form.get(['consultation', index, 'id']) as UntypedFormControl;
        control.patchValue(res.result.data.id);
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  selectedItemFAQ(selected, item) {
    // this.clickedItem = selected.item;
    console.log(selected.item);
    item.get('answer').setValue(selected.item.answer);
  }


  saveFAQ(index) {

    let cObj = deepCopy(this.faqArray.value)[index];
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
        this.toastr.success(res.message, 'Success');
        const control = this.form.get(['user_faq', index, 'id']) as UntypedFormControl;
        control.patchValue(res.result.data.id);
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
    let cObj = deepCopy(this.consultationFeeArray.value)[index];
    // console.log("saveConsultations -> eObj", eObj);
    // eObj.start_date = changeDateFormat(eObj.start_date);
    // eObj.end_date = changeDateFormat(eObj.end_date);
    // eObj['user_id'] = this.userId;
    // return;

    let formData = {
      id: cObj.id,
      consultation_id: isObject(cObj.consultation_id) ? cObj.consultation_id.id : cObj.consultation_id,
      charges: parseFloat(cObj.charges)
    }
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.CONSULTATION_PUT, 'put', removeEmptyKeysFromObject(formData)).subscribe(res => {
      console.log("saveConsultations -> res", res);
      this.disableButton = false;
      if (res && res.status) {
        const control = this.form.get(['consultation', index, 'id']) as UntypedFormControl;
        control.patchValue(res.result.data.id);
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

  resetFAQ(form) {
    form.get('answer').setValue('');
  }

  editFAQ(index) {
    let cObj = deepCopy(this.faqArray.value)[index];
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
        const control = this.form.get(['consultation', index, 'id']) as UntypedFormControl;
        control.patchValue(res.result.data.id);
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

  deleteFAQ(index) {
    let eObj = deepCopy(this.faqArray.value)[index];
    console.log("deleteEducations -> eObj", eObj);
    // return;
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.FAQ_DELETE, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
      if (res && res.status) {
        this.disableButton = false;
        this.removeFAQ(index);
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

  deleteConsultations(index) {
    let eObj = deepCopy(this.consultationFeeArray.value)[index];
    console.log("deleteEducations -> eObj", eObj);
    // return;
    this.disableButton = true;
    this.requestService.sendRequest(UserUrls.CONSULTATION_DELETE, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
      if (res && res.status) {
        this.disableButton = false;
        this.removeConsultationFee(index);
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

  saveEducations(index) {
    let eObj = deepCopy(this.educationArray.value)[index];
    console.log("saveConsultations -> eObj", eObj);
    eObj.start_date = changeDateFormat(eObj.start_date);
    eObj.end_date = changeDateFormat(eObj.end_date);
    eObj['user_id'] = this.userId;
    // return;
    const controlDisabled = this.form.get(['education', index, 'disabled']) as UntypedFormControl;
    controlDisabled.patchValue(true);
    this.requestService.sendRequest(UserUrls.EDUCATION_POST, 'post', removeEmptyKeysFromObject(eObj)).subscribe(res => {
      console.log("saveConsultations -> res", res);
      const controlDisabled = this.form.get(['education', index, 'disabled']) as UntypedFormControl;
      controlDisabled.patchValue(false);
      if (res && res.status) {
        const control = this.form.get(['education', index, 'id']) as UntypedFormControl;
        control.patchValue(res.result.data.id);
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      const controlDisabled = this.form.get(['education', index, 'disabled']) as UntypedFormControl;
      controlDisabled.patchValue(false);
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }


  editEducations(index) {
    let eObj = deepCopy(this.educationArray.value)[index];
    console.log("saveConsultations -> eObj", eObj);
    eObj.start_date = changeDateFormat(eObj.start_date);
    eObj.end_date = changeDateFormat(eObj.end_date);
    eObj['user_id'] = this.userId;
    // return;
    const controlDisabled = this.form.get(['education', index, 'disabled']) as UntypedFormControl;
    controlDisabled.patchValue(true);
    this.requestService.sendRequest(UserUrls.EDUCATION_PUT, 'put', removeEmptyKeysFromObject(eObj)).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        const control = this.form.get(['education', index, 'id']) as UntypedFormControl;
        control.patchValue(res.result.data.id);
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      const controlDisabled = this.form.get(['education', index, 'disabled']) as UntypedFormControl;
      controlDisabled.patchValue(false);
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  deleteEducations(index) {
    let eObj = deepCopy(this.educationArray.value)[index];
    console.log("deleteEducations -> eObj", eObj);
    // return;
    this.requestService.sendRequest(UserUrls.EDUCATION_DELETE, 'delete_with_body', { ids: [eObj.id] }).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.removeEducation(index);
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');

    });
  }

  saveSkills() {
    let Skills = deepCopy(this.form.value.skill);
    Skills = Skills.filter(function (event) {
      return !event.pivot;
    });
    console.log("saveSkills -> Skills", Skills)
    console.log("saveSkills -> cA", Skills);
    let formData = { user_id: this.userId, skill_ids: getIdsFromArray(Skills, 'id') };
    // return;
    console.log("saveSkills -> formData", formData)
    this.requestService.sendRequest(UserUrls.SKILL_POST, 'post', formData).subscribe(res => {
      console.log("saveSkills -> res", res)
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  onItemDeSelect(event) {
    console.log("onItemDeSelect -> event", event)

    let obj = this.singleUserObject.skill.find(o => o.id === event.id);
    let index = findIndexInData(this.singleUserObject.skill, 'id', event.id);

    if (obj) {
      this.deleteSkill(obj.user_skill_id);
      if (index != -1) {
        this.singleUserObject.skill.splice(index, 1);
      }
    }
  }

  deleteSkill(id) {
    // return;
    this.requestService.sendRequest(UserUrls.SKILL_DELETE, 'delete_with_body', { ids: [id] }).subscribe(res => {
      if (res && res.status) {
        // this.removeEducation(index);
        this.toastr.success(res.message, 'Success');
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }



  searchCategory = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchFailed = true),
      switchMap(term =>
        term.length <= 2 ? this.returnEmpty() : this.doApiCall(CategoryUrl.ALL_GET, { search: term, type: 'category' })
      ),
      tap(() => this.searchFailed = false)
    )
  categoryFormatter = (x: { name: string }) => x.name;


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
          if (data && data['type'] == 'category') {
            let id_filter = this.categoryArray.value.map(a => isObject(a.category) ? a.category.id : null).filter(Boolean);
            let result = res['result']['data'].filter((o) => !id_filter.includes(+o.id));
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
  changed(item, text: string) {
    this.modelChanged.next({ category: item.value.category, text: text });
  }

  changedService(item, text: string) {
    this.modelChangedService.next({ text: text });
  }

  changedConditionTreated(item, text: string) {
    this.modelChangedConditionTreated.next({ text: text });
  }

  searchSubCategories() {
    // Debounce search.
    this.modelChanged.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe((value: any) => {
        console.log("searchSubCategories -> value", value);
        if (!isEmptyObject(value)) {
          if (value && !isObject(value['category'])) {
            this.toastr.error('Please first select valid Category');
            return;
          }
          this.getValues(value);
        }

      });

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

  getValues(obj) {
    console.log("HeaderComponent -> getValues -> search", obj);
    this.requestService.sendRequest(SkillUrls.ALL_GET, 'GET', { category_id: obj.category.id, search: obj.text }).subscribe(res => {
      if (res.status) {
        this.categorySkillObj.subCategoriesArray = res.result.data;
      } else {
        this.categorySkillObj.subCategoriesArray = [];
      }
    }, error => {
      console.log("getValues -> error", error);
      this.categorySkillObj.subCategoriesArray = [];
    });
  }

  selectionMade(event: Event, trigger: MatAutocompleteTrigger, selected, item, index) {
    console.log("selectionMade -> item", item)
    console.log("selectionMade -> selected", selected)
    this.categorySkillObj.subCategoriesArray = [];

    let cat: any[] = item.value.sub_categories;
    cat.push(selected);
    item.get('sub_categories').setValue(cat);
    item.get('sub_category').setValue(null);
    this.modelChanged.next({});
    event.stopPropagation();
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


  selectionMadeConditionTreated(event: Event, trigger: MatAutocompleteTrigger, selected, item, index) {
    console.log("selectionMade -> item", item)
    console.log("selectionMade -> selected", selected)
    this.conditionTreatedDropdown = [];

    let found = findFromArrayOFObjects(this.conditionTreated, 'id', selected.id);
    if (!found) {
      this.conditionTreated.push(selected);
    }

    item.get('condition_treated_id').setValue(null);
    this.modelChangedService.next({});
    event.stopPropagation();
  }

  removeSUB(list, current): void {
    const index = list.indexOf(current);

    if (index >= 0) {
      list.splice(index, 1);
      this.categorySkillObj.subCategoriesArray = [];
      // this.masterForm.controls['insurance_name'].setValue(list);
    }

  }

  removeService(list, current): void {
    const index = list.indexOf(current);

    if (index >= 0) {
      list.splice(index, 1);
      this.serviceDropdown = [];
      // this.masterForm.controls['insurance_name'].setValue(list);
    }

  }

  removeConditionTreated(list, current): void {
    const index = list.indexOf(current);

    if (index >= 0) {
      list.splice(index, 1);
      this.conditionTreatedDropdown = [];
      // this.masterForm.controls['insurance_name'].setValue(list);
    }

  }

  addCatSub(currentItem, index) {
    console.log("addCatSub -> index", index)
    console.log("addCatSub -> currentItem", currentItem);
    let formData: LooseObject = {};
    if (isObject(currentItem.value.category)) {
      formData['category_id'] = currentItem.value.category.id;
    } else {
      this.toastr.error('Please Select valid category');
      return false;
    }
    if (Array.isArray(currentItem.value.sub_categories)) {
      let shouldGoNext = true;
      if (currentItem.value.sub_categories.length == 0) {
        shouldGoNext = false;
      }
      for (let index = 0; index < currentItem.value.sub_categories.length; index++) {
        const element = currentItem.value.sub_categories[index];
        if (!isObject(element) && element.length > 0) {
          this.toastr.error('Please Select valid Sub category', null);
          shouldGoNext = false;
          break;
        } else {
          shouldGoNext = true;
        }

      }
      if (!shouldGoNext) {
        this.toastr.error('Please Select valid Sub category');
        return false;
      }
    } else {
      this.toastr.error('Please Select valid Sub category');
      return false;
    }

    const control = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
    control.patchValue(true);

    formData['sub_category_ids'] = getIdsFromArray(currentItem.value.sub_categories, 'id');
    formData['user_id'] = this.userId;

    this.requestService.sendRequest(UserUrls.CATEGORIES_ADD, 'POST', formData).subscribe(res => {

      const control = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
      control.patchValue(false);

      if (res.status) {
        this.toastr.success(res.message, 'Success');
        const control = this.form.get(['user_categories', index, 'id']) as UntypedFormControl;
        control.patchValue(this.create_UUID());

      } else {
        this.toastr.error(res.message, 'Success');

      }
    }, error => {
      const control = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
      control.patchValue(false);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });

  }

  getApprovals() {
    let formData = { user_id: this.userId };
    this.requestService.sendRequest(SharedUrls.ALL_GET, 'GET', formData).subscribe(res => {
      if (res && res.status) {
        this.approvals = res.result.data.reverse();
      } else {
        this.toastr.error(res.message, 'Success');

      }
    }, error => {
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });
  }

  editCatSub(currentItem, index) {
    console.log("addCatSub -> index", index)
    console.log("addCatSub -> currentItem", currentItem);
    let formData: LooseObject = {};
    if (isObject(currentItem.value.category)) {
      formData['category_id'] = currentItem.value.category.id;
    } else {
      this.toastr.error('Please Select valid category');
      return false;
    }
    if (Array.isArray(currentItem.value.sub_categories)) {
      let shouldGoNext = true;
      if (currentItem.value.sub_categories.length == 0) {
        shouldGoNext = false;
      }
      for (let index = 0; index < currentItem.value.sub_categories.length; index++) {
        const element = currentItem.value.sub_categories[index];
        if (!isObject(element) && element.length > 0) {
          this.toastr.error('Please Select valid Sub category', null);
          shouldGoNext = false;
          break;
        } else {
          shouldGoNext = true;
        }

      }
      if (!shouldGoNext) {
        this.toastr.error('Please Select valid Sub category');
        return false;
      }
    } else {
      this.toastr.error('Please Select valid Sub category');
      return false;
    }

    const control = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
    control.patchValue(true);

    formData['sub_category_ids'] = getIdsFromArray(currentItem.value.sub_categories, 'id');
    formData['user_id'] = this.userId;
    formData['id'] = currentItem.value.id;


    this.requestService.sendRequest(UserUrls.CATEGORIES_EDIT, 'PUT', formData).subscribe(res => {

      const control = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
      control.patchValue(false);

      if (res.status) {
        this.toastr.success(res.message, 'Success');
        const control = this.form.get(['user_categories', index, 'id']) as UntypedFormControl;
        control.patchValue(this.create_UUID());

      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      const control = this.form.get(['user_categories', index, 'disabled']) as UntypedFormControl;
      control.patchValue(false);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });
  }

  deleteCatSub(currentItem, index) {
    let formData = {
      category_id: currentItem.value.category.id,
      user_id: this.userId
    }
    console.log("editCatSub -> currentItem", currentItem)
    console.log("editCatSub -> currentItem", currentItem)
    this.requestService.sendRequest(UserUrls.CATEGORIES_DELETE, 'delete_with_body', formData).subscribe(res => {
      if (res.status) {
        this.removeCategory(index);
        this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    })
  }

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  searchAddress() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      // autocomplete.setComponentRestrictions(
      //   { 'country': [''] });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          if (place.address_components) {
            for (var i = 0; i < place.address_components.length; i++) {
              var addressType = place.address_components[i].types[0];
              if (this.componentForm[addressType]) {
                var val = place.address_components[i][this.componentForm[addressType]];
                this.storeAddress(addressType, val);
              }
            }
          }

          let address: any;
          let route = this.address.route;
          if ("street_number" in this.address) {
            route = this.address.street_number + " " + route
          }


          this.form.patchValue({
            'address': route
          });

          console.log("Address Model", this.address);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.form.controls['lat'].setValue(this.latitude);
          this.form.controls['lng'].setValue(this.longitude);
          this.zoom = 12;
        });
      });
    });
  }

  storeAddress(addressType: any, val: any) {
    if (addressType == "street_number") {

      this.address.street_number = val;
    }

    else if (addressType == "route") {
      this.address.route = val;
    }
    else if (addressType == "locality") {
      this.address.locality = val;
      this.form.patchValue({
        'city': this.address.locality,
      });
    }
    else if (addressType == "country") {
      this.address.country = val;
      this.form.patchValue({
        'country': this.address.country,
      });
    }
    else if (addressType == "administrative_area_level_1") {
      this.address.administrative_area_level_1 = val;
      this.form.patchValue({
        'state': this.address.administrative_area_level_1,
      });

    }
    else if (addressType == "neighborhood") {
      this.address.neighborhood = val;
      this.form.patchValue({
        'city': this.address.neighborhood,
      });
    }
    else if (addressType == "postal_code") {
      this.address.postal_code = val;
      this.form.patchValue({
        'zip': this.address.postal_code,
      });

    }
    else if (addressType == "country") {
      this.address.country = val;
    }
  }

  setLocationOnMap() {
    console.log('called');
    this.mapModal.showMap(parseFloat(this.form.get('lat').value), parseFloat(this.form.get('lng').value));
  }

  onDoneEvent(place) {
    if (place.address_components) {
      for (let i = 0; i < place.address_components.length; i++) {
        let addressType = place.address_components[i].types[0];
        if (this.componentForm[addressType]) {
          let val = place.address_components[i][this.componentForm[addressType]];
          this.storeAddress(addressType, val);
        }
      }
    }

    let address: any;
    let route = this.address.route;
    if ("route" in this.address) {
      route = route
    }
    if (!route) {
      route = place['formatted_address'];
    }
    if ("street_number" in this.address) {
      route = this.address.street_number + " " + route
    }
    this.form.patchValue({
      'address': route
    });

    console.log("Address Model", this.address);
    //verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    this.latitude = place.geometry.location.lat;
    this.longitude = place.geometry.location.lng;
    this.zoom = 12;
    if (place.geometry.location) {
      console.log("Latitude", this.latitude);
      this.form.controls['lat'].setValue(this.latitude);
      this.form.controls['lng'].setValue(this.longitude);
      console.log("longtitude", this.longitude);
    }
    console.log("Address Model", this.address);
  }

  addVerification() {
    let formData: LooseObject = {};
    formData['user_id'] = this.userId;
    formData['status_id'] = 2;
    formData['comments'] = this.comments;
    if (!this.comments) {
      this.toastr.error('Please add comment');
      return false;
    }
    this.loaderService.show();
    this.requestService.sendRequest(SharedUrls.ADD_POST, 'POST', formData).subscribe(res => {
      this.loaderService.hide();
      if (res && res.status) {
        this.form.reset();
        this.approvals.push(res.result.data);
        this.toastr.success(res.message, 'Success');
        // this.getApprovals();
        this.comments = '';
      } else {
        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.loaderService.hide();
      this.toastr.error(error.error ? error.error.message : error.message, 'success');
    })
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      this.addVerification();
    }
  }

  getReviewsData() {
    let params = {
      "pagination": 0,
      user_id: this.userId,
      is_approved: 1
    };
    // this.showSpinner();
    this.subscription.push(
      this.requestService.sendRequest(ReviewUrls.ALL_GET, 'get', params).subscribe(res => {
        // this.hideSpinner();
        if (res.status) {
          this.reviews = res.result.data;
          this
        } else {
          this.toastr.error(res.message, "Error");
        }
      }, error => {
        // this.hideSpinner();
        this.toastr.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }

}
