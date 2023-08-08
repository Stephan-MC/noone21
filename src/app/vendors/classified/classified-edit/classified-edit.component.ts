import { Component, OnInit, Input, SimpleChanges, NgZone, ElementRef, ViewChild } from '@angular/core';

import { FormControl,  AbstractControl,UntypedFormGroup, UntypedFormBuilder, Validators,FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { markFormGroupTouched, deepCopy, removeObjectProperties, getIdsFromArray } from 'src/app/shared/utils/common-functions';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { ActivatedRoute } from '@angular/router';
import { slice, split } from 'lodash';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { mapping } from '../../vendor-util';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-classified-edit',
  templateUrl: './classified-edit.component.html',
  styleUrls: ['./classified-edit.component.scss']
})
export class ClassifiedEditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  classifieds:any;
  dbperId='';
  media=[];
  dbTypeId='';
  form: UntypedFormGroup;
  tags: Fruit[] = [];
  description="pakd iskakkdij adf";
  singleUserObject = null;
  // disableButton: boolean = false;
  category=[];
  images = [];
  mediaLenght=0;
  typeId:any='';
  userId=null;
  prefenceId:any='';
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
  userToken:string;
  public imagePath;
  public message: string;
   public  formD = new FormData();
  address: Address = new Address();
  constructor(
    private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private route:ActivatedRoute,
    private requestService: RequestService,
    private toastr: ToastrService,
    
    ) { this.userToken=this.localStorage.getObject('user_details').active_jwt_token;
    this.userId=this.localStorage.getObject('user_details').id;
      this.form = this.fb.group(this.formElements());}
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
          'category_id':[''],
          'prefence_id':['']
          }
  }
 
  
 
  UploadClisImage(fileInput: any){
     let token,id; let formD = new FormData();
     id = this.route.snapshot.params['id'];
     token = this.route.snapshot.params['token'];
     formD.append('media', fileInput.target.files[0]);
     formD.append('id',id);
     formD.append('active_jwt_token',token);
     formD.append('user_id',this.userId);
    this.requestService.sendRequest('classified/media/add', 'POST',formD).subscribe(res => {
      if (res && res.status) {
       this.toastr.success(res.message, 'Success');
       this.getClassified(token,id);
      } else {
        this.toastr.error(res.message, 'Error');
      }
  },error => {
        console.log("LoginComponent -> submit -> error", error);
        this.toastr.error(error.error ? error.error.message : error.message, 'Error');
    });
  }
  onTagsChanged(ev){
    if(this.tags.length>5){
    return this.tags.pop();

    }
  
  }
  getCategory(token){
    this.requestService.sendRequest('classified/category/get', 'get',{active_jwt_token:token}).subscribe(res => {
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
      return;
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
    this.formD.append('id',this.route.snapshot.params['id']);
    this.requestService.sendRequest('classified/post/edit', 'post',this.formD).subscribe(res => {
      console.log("saveConsultations -> res", res);
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');
  
    });
  }
deleteImages(id){
  this.requestService.sendRequest('classified/media/delete', 'delete_with_body',{id:id,active_jwt_token:this.userToken}).subscribe(res => {
        if (res && res.status) {
          let token,id;
       id = this.route.snapshot.params['id'];
      token = this.route.snapshot.params['token'];
    this.getClassified(token,id);
        // this.toastr.success(res.message, 'Success');
        } else {
          this.toastr.error(res.message, 'Error');
        }
    },error => {
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'Error');

    });
}


getClassified(token,id,status=null){
      this.requestService.sendRequest('classified/post/get', 'get',{active_jwt_token:token,id:id}).subscribe(res=> {
        if (res && res.status) {
        // this.toastr.success(res.message, 'Success');
          this.classifieds=res.result.data;
          this.mediaLenght=res.result.data.media.length;
          this.media=res.result.data.media;
          this.typeId=res.result.data.type_id;
          this.catId=res.result.data.category_id;
          this.prefenceId=res.result.data.prefence_id;
          this.form.controls["title"].setValue(res.result.data.title);
          this.form.controls["description"].setValue(res.result.data.description);

          if(res.result.data.email!="null" && res.result.data.email!=""){
            this.form.controls["email"].setValue(res.result.data.email);
          } 

          if(res.result.data.location!="null" && res.result.data.location!=""){
            this.form.controls["location"].setValue(res.result.data.location);
          } 

          if(res.result.data.region!="null" && res.result.data.region!=""){
            this.form.controls["region"].setValue(res.result.data.region);
          } 

          if(res.result.data.contactName!="null" && res.result.data.contactName!=""){
            this.form.controls["contactName"].setValue(res.result.data.contactName);
          } 

          if(res.result.data.phone!="null" && res.result.data.phone!=""){
            this.form.controls["phone"].setValue(res.result.data.phone);
          } 
         
          // this.form.controls["location"].setValue(res.result.data.location);
          // this.form.controls["region"].setValue(res.result.data.region);
          this.form.controls["city"].setValue(res.result.data.city);
          // this.form.controls["contactName"].setValue(res.result.data.contactName);
          // this.form.controls["phone"].setValue(res.result.data.phone);
          // this.form = mapping(res.result.data);
          // this.form.patchValue(mapping(res.result.data));

          this.getCategory(token);

         let arraycomo=[];
         arraycomo= res.result.data.tags.split(',');
         if(status==1){
            arraycomo.forEach(element => {
              this.tags.push({
                      name:element
                    });
            });
         }
       
        //  this.tags = this.tags.concat(arraycomo);
         console.log(this.tags);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      },error => {
        console.log("LoginComponent -> submit -> error", error);
        this.toastr.error(error.error ? error.error.message : error.message, 'Error');

      });
}



  ngOnInit(): void {
    let token,id;
    id = this.route.snapshot.params['id'];
    token = this.route.snapshot.params['token'];
    this.getClassified(token,id,1);
     this.form.controls;

     
  }


}
