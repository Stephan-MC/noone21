import { Component, OnInit, Input, SimpleChanges, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule ,ReactiveFormsModule,FormControl } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { LooseObject, isEmptyObjectKeys, mergeRecursive, removeEmptyKeysFromObject, markFormGroupTouched, deepCopy, removeObjectProperties, getIdsFromArray } from 'src/app/shared/utils/common-functions';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-classified-add',
  templateUrl: './classified-add.component.html',
  styleUrls: ['./classified-add.component.scss']
})

export class ClassifiedAddComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
 
  form: FormGroup;
  @Input() userId = null;
  tags: Fruit[] = [];
                   
  rows=[];
  page = 1;
  limit = 20;
  userToken='';
  singleUserObject = null;
  // disableButton: boolean = false;
  category=[];
  images = [];
  typeId:any='1';
  prefenceId:any='1';
  catId:any='';
  imageSrc: any;
  imag1: File = null;
  imag2: File = null;
  imag3: File = null;
  imag4: File = null;
  imag5: File = null;
  image1Src: string;
  image2Src: string;
  image3Src: string;
  image4Src: string;
  image5Src: string;
  public imagePath;
  public message: string;
   public  formD = new FormData();
  address: Address = new Address();
  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
    
    ) { this.form = this.fb.group(this.formElements());}

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      if(this.tags.length>5){
        return;
      }
      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push({name: value.trim()});
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
    
    }
    remove(fruit: Fruit): void {
      const index = this.tags.indexOf(fruit);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }
 optionTlbr(){
            return {
                    toolbar: [
                              [{ 'list': 'bullet' }],
                              [{ 'header': 1 }, { 'header': 2 }],
                              ['bold', 'underline', 'strike']
                        ]
                  };
      } 
changePrefence(event){
  this.prefenceId=event.target.value;
 
 }
 changeType(event){
  this.typeId=event.target.value;
 }
 changeCategory(event){
  this.catId=event.target.value;
 }
  formElements() {
    return {
          'title': ['', [Validators.required]],
          'description':['',[Validators.required]],
          'email': ['', [Validators.pattern(emailRegEx)]],
          'user_id':['',[Validators.required]],
          'location':[''],
          'region':[''],
          'city':['',[Validators.required]],
          'contactName':[''],
          'phone':[''],
          'category_id':['',[Validators.required]],
          'type_id':this.typeId,
          'prefence_id':[''],
          'image01':[''],
          'image02':[''],
          'image03':[''],
          'image04':[''],
          'image05':[''],
         
          }
  }
 
  imgchange1(fileInput: any){
    this.formD.append('imag1',fileInput.target.files[0]);
  
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (fileInput: any)=> {
          this.image1Src = fileInput.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  imgchange2(fileInput: any){
    this.formD.append('imag2',fileInput.target.files[0]);
  
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (fileInput: any)=> {
          this.image2Src = fileInput.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  imgchange3(fileInput: any){
    this.formD.append('imag3',fileInput.target.files[0]);
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (fileInput: any)=> {
          this.image3Src = fileInput.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  imgchange4(fileInput: any){
    this.formD.append('imag4',fileInput.target.files[0]);
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (fileInput: any)=> {
          this.image4Src = fileInput.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  } imgchange5(fileInput: any){
      this.formD.append('imag5',fileInput.target.files[0]);
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (fileInput: any)=> {
          this.image5Src = fileInput.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  UploadClisImage(event){
    let formD = new FormData();
    formD.append('formdat',this.form.value);
    this.requestService.sendRequest('classified/category/get', 'POST',formD).subscribe(res => {
      if (res && res.status) {
       // this.toastr.success(res.message, 'Success');
        this.category=res.result.data;
      } else {
        this.toastr.error(res.message, 'Error');
      }
  },error => {
    console.log("LoginComponent -> submit -> error", error);
    this.toastr.error(error.error ? error.error.message : error.message, 'Error');

  });
  }



  getCategory(){
    this.requestService.sendRequest('classified/category/get', 'get',this.form.value).subscribe(res => {
        if (res && res.status) {
         // this.toastr.success(res.message, 'Success');
          this.category=res.result.data;
        } else {
          this.toastr.error(res.message, 'Error');
        }
    },error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
  
    });
  }

  makeParams() {
    let param: LooseObject = {};
    param['active_jwt_token'] = this.userToken;
    param['page'] = this.page;
    param['pagination'] = 1;
    param['per_page'] = this.limit;
    param = removeEmptyKeysFromObject(mergeRecursive(param, this.form.value));
    return param;
  }

  getClassified() {
    let params = this.makeParams();
    this.requestService.sendRequest('classified/post/get', 'get', params).subscribe(res => {
      if (res && res.status) {
        this.rows = res.result.data;
        // this.getCategory();
      } else {

      }
    }, error => {

      this.toastr.error(error.error ? error.error.message : error.message, 'success');
    })
  }

scrollIntoAppView () {
    // var elt = $(".ng-invalid");

    // if (elt.length) {
    //     $('html, body').animate({
    //         scrollTop: (elt.first().offset().top)
    //     }, 500);
    // }
}
 
  onSubmit(){

    markFormGroupTouched(this.form);


  
     let searchTags='';
    this.tags.forEach((element,index) => {
      if(index==0){
        searchTags+=element.name;
      }else{
        searchTags+=','+element.name;
      }
    });

 

    this.form.patchValue({
     type_id:this.typeId,
     prefence_id:this.prefenceId,
     user_id:this.userId,
     categor:this.catId,
     
    });
    if(!this.typeId){
     return false;
    }if(!this.catId){
      return false;
     }if(this.tags.length<0){
      return false;
     }if(!this.prefenceId){
      return false;
     
    }

   
    
    if (!this.form.valid) {
      // this.toastr.error('Please enter information above');
       
      // return;
    }

    this.formD.append('title',this.form.get('title').value);
    this.formD.append('description',this.form.get('description').value);
    this.formD.append('location',this.form.get('location').value);
    this.formD.append('tags',searchTags);
    this.formD.append('region',this.form.get('region').value);
    this.formD.append('city',this.form.get('city').value);
    this.formD.append('contactName',this.form.get('contactName').value);
    this.formD.append('email',this.form.get('email').value);
    this.formD.append('phone',this.form.get('phone').value);
    this.formD.append('prefence_id',this.form.get('prefence_id').value);
    this.formD.append('category_id',this.catId);
    this.formD.append('type_id',this.typeId);
    this.formD.append('user_id',this.userId);
    this.requestService.sendRequest('classified/post/add', 'POST',this.formD).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.router.navigate(['/pages/classified/success']);
        //  this.toastr.success(res.message, 'Success');

      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
  
    });
  }

  ngOnInit(): void {
    this.singleUserObject = this.localStorage.getObject('user_details');
    this.userId = this.singleUserObject.id;
    this.getCategory();


    
    
  }



}
