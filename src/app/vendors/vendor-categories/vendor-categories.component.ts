import { Component, OnInit, Input, NgZone, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Observable, ObservableInput, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { isObject } from 'lodash';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { isEmptyObject, LooseObject, getIdsFromArray, markFormGroupTouched, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { SkillUrls } from 'src/app/masters/skills/skill-urls.enum';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { mapping } from '../vendor-util';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vendor-categories',
  templateUrl: './vendor-categories.component.html',
  styleUrls: ['./vendor-categories.component.scss']
})
export class VendorCategoriesComponent implements OnInit {

  form: UntypedFormGroup;
  @Input() userId = null;
  @Input() singleUserObject = null;
  disableButton: boolean = false;
  editId = null;
  searching = false;
  searchFailed = false;

  subCategoriesArray = [];
  sub_categories = [];
  readonly separatorKeysCodes: number[] = [];

  rows = [];

  ShowFilter = true;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: this.ShowFilter
  };
  modelChanged: Subject<Object> = new Subject<Object>();
  countries = [];
  selectedCate=[];
  categories = [];
  subcategories = [];
  constructor(private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private spinner: NgxSpinnerService,
    private ngZone: NgZone,
    private globalService: GlobalService,) {
    
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
    // this.searchSubCategories();
    this.getCategories();
    this.GetselectedCate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("DoctorCategoriesComponent -> ngOnChanges -> changes", changes);
    if (this.singleUserObject && isObject(this.singleUserObject)) {
      this.rows = this.singleUserObject['categories'];
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  formElements(): Object {
    return {
      id: null,
      category: [null, [Validators.required]],
      sub_category: [null, [Validators.required]],
      sub_categories: [[]],
      media_id: null,
      disabled: [false]
    }
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

  removeSUB(list, current): void {
    const index = list.indexOf(current);

    if (index >= 0) {
      list.splice(index, 1);
      this.subCategoriesArray = [];
      // this.masterForm.controls['insurance_name'].setValue(list);
    }

  }

  selectionMade(event: Event, trigger: MatAutocompleteTrigger, selected, item, index) {
    console.log("selectionMade -> item", item)
    console.log("selectionMade -> selected", selected)
    this.subCategoriesArray = [];

    this.sub_categories.push(selected);
    item.get('sub_category').setValue(null);
    this.modelChanged.next({});
    event.stopPropagation();
  }
  changed(item, text: string) {
    this.modelChanged.next({ category: item.value.category, text: text });
  }
  GetselectedCate(){
    this.requestService.sendRequest(SkillUrls.SelectCate, 'GET', { user_id: this.userId }).subscribe(res => {
      if (res.status) {
        this.selectedCate = res.result.data;
      } else {
        this.subCategoriesArray = [];
      }
    }, error => {
     
    });
  }
  delSubCategory(userId,subCatId){
    this.requestService.sendRequest(UserUrls.User_Cat_Del, 'delete_with_body',{user_id:userId,subcat_id:subCatId}).subscribe(res => {
      if (res.status) {
        this.toastr.success(res.message, 'Success');
        this.GetselectedCate();
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    })
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

  getValues(obj) {
    console.log("HeaderComponent -> getValues -> search", obj);
    this.requestService.sendRequest(SkillUrls.ALL_GET, 'GET', { category_id: obj.category.id, search: obj.text }).subscribe(res => {
      if (res.status) {
        this.subCategoriesArray = res.result.data;
      } else {
        this.subCategoriesArray = [];
      }
    }, error => {
      console.log("getValues -> error", error);
      this.subCategoriesArray = [];
    });
  }
  addCatSub(currentItem) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      // this.toastr.error('Please Select required field');
      return;
    }
    let formData: LooseObject = {};

    console.log("addCatSub -> currentItem", currentItem);

    // if (isObject(currentItem.value.category)) {
    //   formData['category_id'] = currentItem.value.category.id;
    // } else {
    //   this.toastr.error('Please Select valid category');
    //   return false;
    // }
    // if (Array.isArray(this.sub_categories)) {
    //   let shouldGoNext = true;
    //   if (this.sub_categories.length == 0) {
    //     shouldGoNext = false;
    //   }
    //   for (let index = 0; index < this.sub_categories.length; index++) {
    //     const element = this.sub_categories[index];
    //     if (!isObject(element) && element.length > 0) {
    //       this.toastr.error('Please Select valid Sub category', null);
    //       shouldGoNext = false;
    //       break;
    //     } else {
    //       shouldGoNext = true;
    //     }

    //   }
    //   if (!shouldGoNext) {
    //     this.toastr.error('Please Select valid Sub category');
    //     return false;
    //   }
    // } else {
    //   this.toastr.error('Please Select valid Sub category');
    //   return false;
    // }

    // if data is through search
    // formData['sub_category_ids'] = getIdsFromArray(this.sub_categories, 'id');


    if (!this.form.value.category) {
      this.toastr.error('Please Select valid  category');
      return false;
    }
    if (!this.form.value.sub_category) {
      this.toastr.error('Please Select valid Sub  category');
      return false;
    }
    formData['category_id'] = currentItem.value.category;
    formData['sub_category_ids'] = [this.form.value.sub_category];
    formData['user_id'] = this.userId;

    this.requestService.sendRequest(UserUrls.CATEGORIES_ADD, 'POST', formData).subscribe(res => {


      if (res.status) {
        this.form.reset();
        this.sub_categories = [];
        this.editId = null;
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['categories'];
          }
        }

        this.toastr.success(res.message, 'Success');
        this.GetselectedCate();
      } else {
        this.toastr.error(res.message, 'Success');

      }
    }, error => {
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });

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
  onEditClick(item) {
    // this.form.patchValue(item);
    // this.sub_categories = item.sub_categories;

    this.editId = item.id;

    this.form.patchValue({ category: item.category_id, sub_category: item.sub_categories[0].sub_category_id });
    this.subcategories = [];
    this.getSubCategories();
    console.log("onEditClick -> this.form", this.form.value)

    console.log("onEditClick -> this.editId ", this.editId)

  }


  editCatSub(currentItem) {
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      this.toastr.error('Please Select required field');
      return;
    }
    let formData: LooseObject = {};

    // if (isObject(currentItem.value.category)) {
    //   formData['category_id'] = currentItem.value.category.id;
    // } else {
    //   this.toastr.error('Please Select valid category');
    //   return false;
    // }
    // if (Array.isArray(this.sub_categories)) {
    //   let shouldGoNext = true;
    //   if (this.sub_categories.length == 0) {
    //     shouldGoNext = false;
    //   }
    //   for (let index = 0; index < this.sub_categories.length; index++) {
    //     const element = this.sub_categories[index];
    //     if (!isObject(element) && element.length > 0) {
    //       this.toastr.error('Please Select valid Sub category', null);
    //       shouldGoNext = false;
    //       break;
    //     } else {
    //       shouldGoNext = true;
    //     }

    //   }
    //   if (!shouldGoNext) {
    //     this.toastr.error('Please Select valid Sub category');
    //     return false;
    //   }
    // } else {
    //   this.toastr.error('Please Select valid Sub category');
    //   return false;
    // }

    // formData['sub_category_ids'] = getIdsFromArray(currentItem.value.sub_categories, 'id');

    if (!this.form.value.category) {
      this.toastr.error('Please Select valid  category');
      return false;
    }
    if (!this.form.value.sub_category) {
      this.toastr.error('Please Select valid Sub  category');
      return false;
    }
    formData['category_id'] = currentItem.value.category;
    formData['sub_category_ids'] = [this.form.value.sub_category];
    formData['user_id'] = this.userId;
    formData['id'] = currentItem.value.id;


    this.requestService.sendRequest(UserUrls.CATEGORIES_EDIT, 'PUT', formData).subscribe(res => {

      if (res.status) {
        this.toastr.success(res.message, 'Success');
        this.form.reset();
        this.editId = null;
        this.sub_categories = [];
        if (res.result.data) {
          this.singleUserObject = mapping(res.result.data);
          if (this.singleUserObject && isObject(this.singleUserObject)) {
            this.rows = this.singleUserObject['categories'];
          }
        }
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });
  }

  deleteCatSub(id, index) {
    let formData = {
      category_id: id,
      user_id: this.userId
    }

    this.requestService.sendRequest(UserUrls.CATEGORIES_DELETE, 'delete_with_body', formData).subscribe(res => {
      if (res.status) {
        this.rows.splice(index, 1);
        this.form.reset()
        this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    })
  }


  getCategories() {
    this.requestService.sendRequest(CategoryUrl.ALL_GET, 'GET', removeEmptyKeysFromObject({})).subscribe(res => {
      if (res.status) {
        this.categories = res.result.data;

      } else {
        this.toastr.error(res.message, "Error");
      }
    }, error => {
      this.toastr.error(error['error'] ? error['error']['message'] : error['error'] ? error['error']['message'] : error.message, "Error");
    });
  }

  getSubCategories() {
    this.subcategories = [];
    this.spinner.show();
    this.requestService.sendRequest(SkillUrls.ALL_GET, 'GET', removeEmptyKeysFromObject({ category_id: this.form.value.category })).subscribe(res => {
      this.spinner.hide();
      if (res.status) {
        this.subcategories = res.result.data;

      } else {
        this.toastr.error(res.message, "Error");
      }
    }, error => {
      this.spinner.hide();
      this.toastr.error(error['error'] ? error['error']['message'] : error['error'] ? error['error']['message'] : error.message, "Error");
    });
  }
}
