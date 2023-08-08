import { Component, OnInit, Input, SimpleChanges, NgZone, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { GlobalService } from 'src/app/shared/services/global.service';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { markFormGroupTouched, deepCopy, removeObjectProperties, getIdsFromArray } from 'src/app/shared/utils/common-functions';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { MapsAPILoader } from '@agm/core';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-other-setting',
  templateUrl: './other-setting.component.html',
  styleUrls: ['./other-setting.component.scss']
})
export class OtherSettingComponent implements OnInit {
  form: UntypedFormGroup;
  userEmail='';
  userToken='';
  userId='';
 mediaId=null;
 
  @Input() singleUserObject = null;
  disableButton: boolean = false;
  address: Address = new Address();
  @ViewChild(MapModalComponent, { static: true }) mapModal: MapModalComponent;
  latitude = null;
  longitude = null;
  zoom = 12;
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name',
    neighborhood: 'long_name',
    sublocality_level_2: 'long_name',
    sublocality_level_1: 'long_name',
  };

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

  countries = [];
  constructor(private fb: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private globalService: GlobalService,) {
      this.userEmail= this.localStorage.getObject('user_details').email;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.userToken=this.localStorage.getObject('user_details').active_jwt_token;
    this.userId=this.localStorage.getObject('user_details').id;
  }

  ngOnInit(): void {
    this.searchAddress();
    this.form = this.fb.group(this.formElements());
    this.globalService.countries$.subscribe(res => {
      if (res && Array.isArray(res)) {
        this.countries = res;
      }
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.singleUserObject) {
      this.form.patchValue(this.singleUserObject);
    }

  }

  formElements(): Object {
    return {
      // 'first_name': ['', [Validators.required]],
      // 'last_name': ['', [Validators.required]],
      'email': [''],
      'address': [''],
      'city': [''],
      'zip': [''],
      'country': [null],
      'id':[''],
      'facebook_link': [''],
      'google_link': [''],
      'twitter_link': [''],
      'pinterest_link': [''],
      'profile_media_id':[''],
      // 'about_me': [''],
      'lat': [''],
      'lng': [''],
      // 'phone_no': ['', [Validators.required]],
      'avg_wait_time': [''],
      'avg_consultation_price': [''],
      "avg_consultation_time": [''],
      'price': [''],
    }
  }

  onSubmits() {
   
    this.form.patchValue({
      email:this.userEmail,
      id:this.userId,
      profile_media_id:this.mediaId
     });    
   
    markFormGroupTouched(this.form);
    if (!this.form.valid) {
      return;
    }
    console.log('value', this.form.getRawValue());
    let form = deepCopy(this.form.getRawValue());
    // if (!form.lat && !form.lng) {
    //   this.toastr.error('please search a valid address,Latitude and longitude are exist against this address');
    //   return false;
    // }
    let removeProps = ['skill', 'education', 'consultation', 'user_categories'];
    form = removeObjectProperties(form, removeProps);
    // form['service_ids'] = getIdsFromArray(this.services, 'id');
    // form['condition_treated_ids'] = getIdsFromArray(this.conditionTreated, 'id');
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
  searchAddress() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"]
        types: ["geocode", "establishment"]
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

    else if (addressType == "route" || addressType == "sublocality_level_2" || addressType == "sublocality_level_1") {
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

  public fileChangeEventProfile(fileInput: any) {
    console.log("EditProfileComponent -> fileChangeEventProfile -> fileInput", fileInput);
    let formData = new FormData();
    formData.append('media', fileInput.target.files[0]);
    this.uploadMedia(formData, 'user');

  }
  uploadMedia(formData, type = 'user', index = 0) {
    this.disableButton = true;
    this.requestService.sendRequest(CommonUrls.MEDIA_ADD, 'post', formData).subscribe(res => {
      this.disableButton = false;
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        this.form.patchValue(res.result.data);
        if (type == 'user') {
          this.mediaId=res.result.data.id;
          console.log('media=',this.mediaId);
         // this.form.get('profile_media_id').setValue(res.result.data.id);
          this.singleUserObject['profile_media'] = res.result.data;
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
      ///////////////////////////////////////////////////////////
     ///                                                     ///
    ///                 Image Cropper Code Star             ///
   ///                      Karamat-Balti                  ///
  ///                         Mdhove.ca                   ///
 ///                                                     ///
///////////////////////////////////////////////////////////

title = 'angular-image-uploader';
currentImgUrl: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  public ifImgLoad: boolean=false;
  public ifImgCroped:boolean=false;
  public ifImgFaild:boolean=false;
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.ifImgCroped=false;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.ifImgCroped=false;
  }
  imageLoaded() {
    this.ifImgLoad=true;
    this.ifImgCroped=false;
    this.ifImgFaild=false;
     console.log('image load');
  }
  cropperReady(eventArgs: any) {
   
    
  }
  crop(){
    this.ifImgLoad=true;
    this.ifImgCroped=true;
    this.ifImgFaild=false;
    this.uploadImage(this.croppedImage);
  }
  loadImageFailed() {
    this.ifImgLoad=false;
    this.ifImgCroped=false;
    this.ifImgFaild=true;
    console.log('fails image load cropper');
  }
  uploadImage(baseImg){
    const file = this.DataURIToBlob(baseImg);
    const formData = new FormData();
    formData.append('media', file, 'image.jpg');
    formData.append('id', this.userId);
    formData.append('path', 'temp/') //other param
    this.uploadMedia(formData, 'user');
    return;
    this.requestService.sendRequest('user/upload-profile-image/add', 'post', formData).subscribe(res => {
      if (res && res.status) {
        if (res.result.data) {
          console.log('image uploaded successfully');
        }
      }else {
       console.log('error image loaded');
      }
    }, error => {
      console.log("Images compontent -> submit -> error", error);
  
    });
  }
  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)
        return new Blob([ia], { type: mimeString })
  }



}

