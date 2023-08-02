import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LooseObject, removeObjectProperties, deepCopy } from 'src/app/shared/utils/common-functions';
import { Subscription, ObservableInput, of, Observable } from 'rxjs';
import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RequestService } from 'src/app/shared/services/request.service';
import { isObject } from 'lodash';
import { SlugifyPipe } from 'src/app/shared/pipes/slugify.pipe';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {

  form: FormGroup;
  @Input() title: string = '';
  @Input() id;
  @Input() Pageaction;
  @Output() formSubmitted = new EventEmitter();
  @Input() data;
  @Input() editData;
  pages:any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private requestService: RequestService,
    private toastrService: ToastrService,
    private slugifyPipe: SlugifyPipe) {
    this.form = this.fb.group({
      'id':[this.id],
      'page_type': ['0', Validators.required],
      'page_name': ['', Validators.required],
      'page_slug': ['', Validators.required],
      'page_title': [''],
      'page_keywords':[''],
      'page_description': [''],
      'page_content':[''],
      'page_content1':[''],
      'page_content2':[''],
      'page_content3':['']
    });
    
  }

  ngOnInit() {
   this.getPageType();
  }
  onSubmit() {
    var formData: LooseObject = {};
    formData = deepCopy(this.form.value);
    if (this.form.valid) {
      this.add(formData);
      return;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getPageType();
    if (this.editData) {
      console.log("Edit Data", this.editData);
      this.data = this.editData;
      this.responseData();
    }
  }
  getPageType() {
   
    this.requestService.sendRequest('admin/page/getPageType', 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.pages = res.result.data;
        console.log('page get dropdown');
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  changePage($event){
    // this.form.controls['page_type'].setValue($event.target.value);
 }
  responseData() {

    this.form.patchValue({
      'id':this.data.id || '',
      'name': this.data.name || '',
      'page_type': this.data['page_type']                 || '4',
      'page_name': this.data['page_name']                 || '',
      'page_slug': this.data['page_slug']                 || '',
      'page_title':this.data['page_title']                || '',
      'page_keywords':this.data['page_keywords']          || '',
      'page_description': this.data['page_description']   || ''
     
     
    });
  }

  add(formData) {
    this.formSubmitted.emit(formData);
  }

  update(formData) {
    this.formSubmitted.emit(formData);
  }
  keyupSlugs(data){
    this.form.controls['page_slug'].setValue(this.slugifyPipe.transform(data));
  }

  closeForm() {
    this.router.navigate(['list'], { relativeTo: this.route.parent });
  }

  returnEmpty() {
    return of([]);
  }

}
