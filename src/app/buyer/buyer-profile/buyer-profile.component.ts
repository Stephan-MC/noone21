import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { ToastrService } from 'ngx-toastr';
import { deepCopy, removeObjectProperties, removeEmptyKeysFromObject, changeDateFormat, getIdsFromArray, markFormGroupTouched } from 'src/app/shared/utils/common-functions';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { MapsAPILoader } from '@agm/core';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { google } from "google-maps";

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent implements OnInit {

  form: FormGroup;
  myForm: FormGroup;

  userId: number = 0;;

  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  disableButton = false;

  cities = [];
  selectedItems = [];
  countries = [];

  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;

  @ViewChild(MapModalComponent, { static: true }) mapModal: MapModalComponent;
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
    neighborhood: 'long_name',
    sublocality_level_2: 'long_name',
    sublocality_level_1: 'long_name',
  };
  singleUserObject: any = null;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    console.log('test');
    this.form = this.fb.group(this.formElements());
  }

  ngOnInit(): void {

    this.globalService.countries$.subscribe(res => {
      if (res && Array.isArray(res)) {
        this.countries = res;
      }
    })
    this.userId = this.localStorage.getObject('user_details').id;
    console.log("PatientProfileComponent -> ngOnInit -> this.userId ", this.userId)
    this.getUser(this.userId);
    this.searchAddress();
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
      'zip': ['12345'],
      'country': [''],
      'lat': [5.376964],
      'lng': [100.399383],
      'state': ['', [Validators.required]],
      'facebook_link': [''],
      'google_link': [''],
      'twitter_link': [''],
      'pinterest_link': [''],
      'about_me': [''],
      'phone_no': ['', [Validators.required]],
      'profile_media_id': [''],

    }
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
    let removeProps = ['skill', 'education', 'consultation'];
    form = removeObjectProperties(form, removeProps);
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
        this.form.patchValue(res.result.data)
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
  }

  uploadMedia(formData, type = 'user') {
    this.requestService.sendRequest(CommonUrls.MEDIA_ADD, 'post', formData).subscribe(res => {
      this.disableButton = false;
      if (res && res.status) {
        this.toastr.success(res.message, 'Success');
        this.form.patchValue(res.result.data);
        this.singleUserObject['profile_media'] = res.result.data;
        if (type == 'user') {
          this.form.get('profile_media_id').setValue(res.result.data.id);
        }
      } else {

        this.toastr.error(res.message, 'Error');

      }
    }, error => {
      this.disableButton = false;
      console.log("LoginComponent -> submit -> error", error);
      this.toastr.error(error.error ? error.error.message : error.message, 'success');

    });
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
      console.log("storeAddress -> val", val)
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

}
