import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LooseObject, removeObjectProperties, deepCopy } from 'src/app/shared/utils/common-functions';
import { Subscription, ObservableInput, of, Observable } from 'rxjs';
import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RequestService } from 'src/app/shared/services/request.service';
import { isObject } from 'lodash';
import { SlugifyPipe } from 'src/app/shared/pipes/slugify.pipe';
@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {

  skillsForm: UntypedFormGroup;
  form: UntypedFormGroup;
  @Input() title: string = '';
  @Input() id:null;
  @Input() Pageaction;
  @Output() formSubmitted = new EventEmitter();
  @Input() data;
  @Input() editData;
  @Input() pageContent;
  
  pages:any;
  contents = new UntypedFormArray([]);
  display_name=new UntypedFormArray([]);
  page_ids=new UntypedFormArray([]);
 pageId=0;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private requestService: RequestService,
    private toastrService: ToastrService,
    private slugifyPipe: SlugifyPipe
    ) {
    this.form = this.fb.group({
      'page_id':['0', Validators.required],
      'display_name': ['', Validators.required],
      'content': ['', Validators.required]
    });
    this.skillsForm = this.fb.group({
      name: '',
      skills: this.fb.array([]) ,
    });

  }

  ngOnInit() {
    this.getpages();
    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.getSingleContent(this.id);
    }
  }
  newSkill(): UntypedFormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    })
 }
 get skills() : UntypedFormArray {
  return this.skillsForm.get("skills") as UntypedFormArray
}
 addSkills() {
  this.skills.push(this.newSkill());
}
removeSkill(i:number) {
  this.skills.removeAt(i);
}
  onSubmit() {
    let id=this.id;
    if(!id){
    id=this.form.get('page_id').value;
    }
    let formData = { 
      display_name: this.display_name.value,
      content: this.contents.value,
      page_id: id
     
     };
    // let formData:{
    //   display_name: this.display_name.value,
    //   content: this.contents.value,
    //   page_id: this.form.get('page_id').value
    // };
   
    // console.log(this.display_name.value);
    // return;
    this.add(formData);
    return;
    formData = deepCopy(this.form.value);
    if (this.form.valid) {
      this.add(formData);
      return;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.editData) {
      console.log("Edit Data", this.editData);
      this.data = this.editData;
      this.responseData();
    }
  }
 
  responseData() {
    this.form.patchValue({
      'id':this.data.id || '',
      'name': this.data.name || '',
      'page_type': this.data['page_type']                 || '',
      'page_name': this.data['page_name']                 || '',
      'page_slug': this.data['page_slug']                 || '',
      'page_title':this.data['page_title']                || ''
    
     
    });
  }
  getSingleContent(id){

    this.requestService.sendRequest('admin/content/getsingle', 'GET', {id:id}).subscribe(res => {
      if (res && res.status) {
        this.pages = res.result.data;
        res.result.data.forEach( (cu, index) => {
          this.display_name.push(new UntypedFormControl(cu.display_name));
          this.contents.push(new UntypedFormControl(cu.content));
          this.pageId=cu.page_id;
         console.log(cu.display_name);
        });
       
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  add(formData) {
    let cVal=this.form.get('page_id').value;
    if(!this.id){
      if(cVal==0){
        this.toastrService.error('Please Select Page', 'Alert');
         return;
      }
    }
   
    this.formSubmitted.emit(formData);
  }
  getpages() {
   
    this.requestService.sendRequest('admin/page/get', 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.pages = res.result.data;
        
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
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
  changePage($event){
     this.pageId=$event.target.value;
     console.log(this.pageId);
  }
  addContent() {
    this.display_name.push(new UntypedFormControl(''));
    this.contents.push(new UntypedFormControl(''));
    this.page_ids.push(new UntypedFormControl(''));
  }
  removeContent(index: number) {
    this.contents.removeAt(index);
  }
}
