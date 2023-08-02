import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LooseObject, removeObjectProperties, deepCopy } from 'src/app/shared/utils/common-functions';
import { Subscription, ObservableInput, of, Observable } from 'rxjs';
import { CategoryUrl } from '../../category/category-url.enum';

import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RequestService } from 'src/app/shared/services/request.service';

import { isObject } from 'util';
@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {


  form: FormGroup;
  @Input() title: string = '';
  @Input() id;
  @Output() formSubmitted = new EventEmitter();
  @Input() data;

  @Input() editData;

  searching = false;
  searchFailed = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private requestService: RequestService,
    private toastrService: ToastrService) {
    // Validators.pattern("^ @]*@[^ @]*")
    this.form = this.fb.group({
      'name': ['', Validators.required],
      'category': [null, Validators.required],
      'description': [''],
    });


  }

  ngOnInit() {

  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.editData) {
      console.log("Edit Data", this.editData);
      this.data = this.editData;
      this.responseData();
    }
  }

  responseData() {
    this.form.patchValue({
      'name': this.data.name || '',
      'description': this.data['description'] || '',
      'category': this.data['category'] || null,
    });
  }

  onSubmit() {

    if (this.form.valid) {
      var formData: LooseObject = {};
      formData = deepCopy(this.form.value);
      if (formData['category'] && isObject(formData['category'])) {
        formData['category_id'] = formData['category']['id'];
      } else {
        formData['category_id'] = formData['category'];
      }
      let removeProps = ['category'];
      formData = removeObjectProperties(formData, removeProps);
      if (this.id == undefined) {
        this.add(formData);
      }
      else {
        formData['id'] = this.id;
        this.update(formData);
      }
    }
    else {
      this.toastrService.error("Please try again! Something went wrong", "Error");
    }
  }

  add(formData) {
    this.formSubmitted.emit(formData);
  }

  update(formData) {
    this.formSubmitted.emit(formData);
  }


  closeForm() {
    this.router.navigate(['list'], { relativeTo: this.route.parent });
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.requestService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )


  searchCategory = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchFailed = true),
      switchMap(term =>
        term.length <= 2 ? this.returnEmpty() : this.doApiCall(CategoryUrl.ALL_GET, { search: term })
      ),
      tap(() => this.searchFailed = false)
    )
  categoryFormatter = (x: { name: string }) => x.name;

  doApiCall(url, data): ObservableInput<any[]> {
    console.log("SkillFormComponent -> data", data)

    console.log("SkillFormComponent -> url", url)
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
    this.toastrService.error('No record Found');
  }
  returnEmpty() {
    return of([]);
  }
}
