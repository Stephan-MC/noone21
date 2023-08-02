import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserUrls } from 'src/app/users/user-urls.enum';
import * as moment from 'moment';
import { LooseObject, isEmptyObject, makeSingleNameFormFIrstMiddleAndLastNames, parseFloatC } from 'src/app/shared/utils/common-functions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReviewUrls } from 'src/app/reviews/review-urls.enum';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lightbox } from 'ngx-lightbox';
import { EmbedVideoService } from 'ngx-embed-video';
import { ResourceLoader } from '@angular/compiler';
import { SkillUrls } from 'src/app/masters/skills/skill-urls.enum';
import { LocalStorage } from 'src/app/libs/localstorage';
@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit, AfterViewInit {
  id: string;
  lenghtstring='';
  vvid = false;
  vimg = false;
  vexp = false;
  moment = moment;
  currentDoctor = null;
  currentRate = 0;
  selectedCate=[];
  subCategoriesArray = [];
  _albums = [];
  _iframe_html=[];
  html_video: any;
  loggedInUser: LooseObject = {};
  isEmptyObject = isEmptyObject;
  form: FormGroup;
  parseFloatC = parseFloatC;
  disableButton: boolean = false;
  reviews = [];
  Images=[];
  videos=[];
  iflogin=0;
  subscription: Subscription[] = [];

  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorage,
    private _lightbox: Lightbox,
    private embedService: EmbedVideoService,
    private spinner: NgxSpinnerService,
   
    
  ) {
    this.id = this.route.snapshot.params['id'];
   
      if(this.localStorage.getObject('user_details').id){
        this.iflogin=1;
      }
   
    this.loggedInUser = this.isEmptyObject(this.requestService.getLoggedInUser()) ? null : this.requestService.getLoggedInUser();
    this.form = this.formBuilder.group({
      "email": [''],
      "user_name": [''],
      "comment": [''],
      "id": [this.loggedInUser ? this.loggedInUser.id : '', [Validators.required]]
    })
  }
  
  viewallvid(){
   this.vvid = !this.vvid;   
  }  
  
  viewallimg(){
   this.vimg = !this.vimg;   
  } 
  
  viewallexp(){
   this.vexp = !this.vexp;   
  }
  viewalldocs(){
    document.querySelector(".similardocs ul li.hd").classList.toggle("act");
  }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getReviewsData();
    this.GetselectedCate();
   
    if (this.requestService.getLoggedUserRole() == 1 && this.ifInRoute('doctors/view/')) {

      document.body.classList.add("admin-user");
    }
  }
  ngAfterViewInit(): void{
    this.GetUserImages(this.id);
  }
  ifInRoute(str) {
    if (<any>this.router.url.includes(str)) {
      return true
    }
    return false;
  }
    //////////////////////////////////////////////////
   //                                              //
  //         Embmed Images Section                //       
 //                                              //
//////////////////////////////////////////////////


EmbedLightBoxImage(){
  this._albums=[];
  this.Images.forEach(element => {
    this._albums.push({ 
      src: element.base_path +'/'+ element.system_name , 
      thumb: element.base_path +'/'+ element.system_name,
      modelId:element.id
               },
      );
  });
}
close(): void {
  // close lightbox programmatically
  this._lightbox.close();
}
open(index: number): void {
  // open lightbox
  this._lightbox.open(this._albums, index);
  
}

    //////////////////////////////////////////////////
   //                                              //
  //         Embmed Videos Section                //       
 //                                              //
//////////////////////////////////////////////////

EmbedVideo(){
  this._iframe_html=[];
  this.videos.forEach(element => {
    this._iframe_html.push(
          {
            emedVidoe:this.embedService.embed(element.video_link,
                                              {
                                              query: { portrait: 0, color: '333'},
                                              attr: { height: 200 }
                                            }
            ),
            itemObj:element
          }
      );
  });
 
}
  getYear(dateString) {

    if (!dateString) {
      return ''
    }
    var date = <any>new Date(dateString);
    if (!isNaN(date)) {
      return date.getFullYear();
    }
  }
GetUserImages(id){
  this.requestService.sendRequest(UserUrls.Image_Single_Galary + id, 'GET', {}).subscribe(res => {
    if (res && res.status) {
      if (res.result.data) {
         this.Images = res.result.data;
         this.EmbedLightBoxImage();
         this.GetUserVideos(id);
      }
    }else {
      this.toastr.error(res.message, 'Error');
    }
  }, error => {
    console.log("Images compontent -> submit -> error", error);
    this.toastr.error(error.error ? error.error.message : error.message, 'success');

  });
}
  GetUserVideos(id){
    this.requestService.sendRequest(UserUrls.Video_Single_Galary + id, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        if (res.result.data) {
          this.videos = res.result.data;
          this.EmbedVideo();
        }
      }else {
        this.toastr.error(res.message, 'Error');
      }
    }, error => {
      console.log("video compontent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

 
  getUser(id) {
    this.subscription.push(
      this.requestService.sendRequest(UserUrls.SINGLE_GET + id, 'GET', { is_doctor: 1 }).subscribe(res => {
        // console.log("DoctorProfileComponent -> getUser -> res", res)

        if (res && res.status) {
          this.currentDoctor = res.result.data;
          if (this.currentDoctor.avg_rating) {
            this.currentDoctor.avg_rating = parseFloat(this.currentDoctor.avg_rating).toFixed(2);
            // console.log("DoctorProfileComponent -> getUser -> this.currentDoctor.average_rating", this.currentDoctor.avg_rating)
            
          }
          

        } else {
          this.toastrService.error(res.message, 'Error');
        }
      }, error => {
        this.toastrService.error(error.error ? error.error.message : error.message, 'success');

      })
    );
  }

  getCategoriesName(category) {
    if (category && Array.isArray(category)) {
      return category.map(c => c.category_name).join(', ');
    }

    return '';
  }

  GetselectedCate(){
    this.requestService.sendRequest(SkillUrls.SelectCate, 'GET', { user_id: this.id }).subscribe(res => {
      if (res.status) {
        this.selectedCate = res.result.data;

        res.result.data.forEach(element => {
          this.lenghtstring+=element.category;

          element.sub_category.forEach(elem => {

            this.lenghtstring+=elem.subcategory;
          });
          console.log("CategoryTest"+ this.lenghtstring);

          console.log("Selected Category "+ res.result.data);
      });
      
      } else {
        this.subCategoriesArray = [];
      }
    }, error => {
     
    });
  }

  getEducationsName(education) {
    if (education && Array.isArray(education) && education.length > 0) {
      // ES5 equivalent
      let result = education[0].education_type_id == 1 ? education[0].title + ' (' + education[0].institute + ')' : '';
      for (let i = 1; i < education.length; i++) {
        if (education[i].education_type_id == 1) {
          if (i < education.length - 1) {
            result += education[i].title + ' (' + education[i].institute + ')';
          } else {
            result += education[i].title + ' (' + education[i].institute + ')';
          }
        }
      }

      return result;
    }
    return '';
  }
  addReview() {
    let formData = null;
    console.log(this.form.value, 'values');
    if (this.id && this.loggedInUser && this.form.valid) {
      formData = {
        "user_id": this.id,
        // "review": this.currentDoctor.id,
        "review_by_id": this.loggedInUser.id,
        "comments": this.form.getRawValue().comment,
        "review": this.currentRate
      }
    }
    // else {
    //   this.toastrService.error('Something Went Wrong !', 'Error');
    //   return false;
    // }
    if (!this.currentRate) {
      this.toastrService.error('please Select Rating !', 'Error');
      return false;
    }
    if (!this.form.value.comment) {
      this.toastrService.error('please add review description !', 'Error');
      return false;
    }
    this.disableButton = true;
    this.requestService.sendRequest(ReviewUrls.ADD_POST, 'Post', formData).subscribe(res => {
      this.disableButton = false
      if (res && res.status) {
        this.toastrService.success(res.message, 'Success');
        this.currentRate = 0;
        this.form.get('comment').setValue('');
        this.getUser(this.id);
        this.getReviewsData();
      } else {

        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  getReviewsData() {
    let params = {
      "pagination": 0,
      user_id: this.id,
      is_approved: 1
    };
    this.showSpinner();
    this.subscription.push(
      this.requestService.sendRequest(ReviewUrls.ALL_GET, 'get', params).subscribe(res => {
        this.hideSpinner();
        if (res.status) {
          this.reviews = res.result.data;
          this
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.hideSpinner();
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
  viewProfile(doc) {
    this.router.navigate(['pages/vendor/' + doc.id])
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  isArray(obj) {
    return !!obj && obj.constructor === Array;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.classList.remove("admin-user")
  }

}
