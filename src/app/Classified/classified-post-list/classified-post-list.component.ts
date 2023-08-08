import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup,FormsModule,UntypedFormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { ToastrService } from 'ngx-toastr';
import { LooseObject, isEmptyObjectKeys, mergeRecursive, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { GlobalService } from 'src/app/shared/services/global.service';
import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, ObservableInput, Subject, Subscription } from 'rxjs';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { MatLegacyAutocompleteTrigger as MatAutocompleteTrigger } from '@angular/material/legacy-autocomplete';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { ConsultationUrls } from 'src/app/masters/consultation/consultation-urls.enum';
import { MapsAPILoader } from '@agm/core';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ConditionTreatedUrls } from 'src/app/masters/conditions-treated/condition-treated-urls.enum';

@Component({
  selector: 'app-classified-post-list',
  templateUrl: './classified-post-list.component.html',
  styleUrls: ['./classified-post-list.component.scss']
})
export class ClassifiedPostListComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;

  @ViewChild(MapModalComponent, { static: true }) mapModal: MapModalComponent;
  address: Address = new Address();
  public latitude: number;
  public longitude: number;
  map: any;
  lat = 54.7227052;
  lng = -113.7222159;
  zoom: number = 11;
userToken:string;
userId=0;
total=0;
page = 1;
offset = 0;
limit = 2;
catgories=[];
classifieds=[];
searchLocation='';
searchCategory=null;

filterForm: UntypedFormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private localStorage: LocalStorage,
    private requestService: RequestService,
    private toastrService: ToastrService,
    private globalService: GlobalService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private loaderService: LoaderService
  ) { 

    this.userToken=this.localStorage.getObject('user_details').active_jwt_token;
    this.userId=this.localStorage.getObject('user_details').id;
    this.filterForm = this.formBuilder.group({
      'status_id': [null],
      'search': [''],
      'categoryId': [null],
      'sort':[null],
      'location':[null],
    })
  }
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
  clearFilter(){
    this.filterForm.patchValue({
      'location': '',
      lat: '',
      lng: ''
    });

    this.searchElementRef.nativeElement.value = '';
  }
  filterCat(id){
    this.filterForm.patchValue({categoryId:id});
    this.getClassified();
  }
  filterLocation(){
    this.getClassified();
    console.log(this.searchLocation);
  }
  sortFilter(event){
    this.filterForm.patchValue({sort:event.target.value});
    this.getClassified();
     console.log(event.target.value);
  }
  makeParams() {
    let param: LooseObject = {};
    param['page'] = this.page;
    param['pagination'] = 1;
    param['per_page'] = this.limit;
    param = removeEmptyKeysFromObject(mergeRecursive(param, this.filterForm.value));
    return param;
  }
  pageChanged(event) {
    console.log("classified -> pageChanged -> event", event);
    this.page = event.page;
    this.getClassified();
   
  }
 
 
  getClassified() {
    let params = this.makeParams();
    this.requestService.sendRequest('classified/post/getAll', 'GET', params).subscribe(res => {
      if (res && res.status) {
        this.total = res.result.total;
        this.classifieds=res.result.data;
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  getCategory(){
    this.requestService.sendRequest('classified/category/get', 'GET',{}).subscribe(res => {
      if (res && res.status) {
        this.catgories = res.result.data;
      } else {
  
      }
    }, error => {
  
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
 
  searchAddress() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode", "establishment"]
      });
      // autocomplete.setComponentRestrictions(
      //   { 'country': [''] });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.filterForm.patchValue({
            location:place.formatted_address
          });
          console.log(place.formatted_address);
          if (place.address_components) {
            for (var i = 0; i < place.address_components.length; i++) {
              var addressType = place.address_components[i].types[0];
              if (this.componentForm[addressType]) {
                var val = place.address_components[i][this.componentForm[addressType]];
               
              }
            }
          }

          let address: any;
          let route = this.address.route;
          if ("street_number" in this.address) {
            route = this.address.street_number + " " + route
          }


          

          console.log("Address Model", this.address);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

        

          this.latitude = place.geometry.location.lat();
          this.lat = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.lng = place.geometry.location.lng();
        
          this.zoom = 11;
         
        });
      });
    });
  }
  ngOnInit(): void {
    this.getClassified();
     this.getCategory();
    this.searchAddress();
  }
  AdDetails(id){
    return this.router.navigate(['classified/post/details/'+id]);
  }


}
