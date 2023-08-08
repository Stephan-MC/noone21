import { Component, OnInit, ElementRef, ViewChild, NgZone,Pipe,PipeTransform,TemplateRef } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { LooseObject, findIndexInData, getIdsFromArray, removeEmptyKeysFromObject, parseFloatC, mergeRecursive, isEmptyObject, availabilities } from 'src/app/shared/utils/common-functions';
import { Route } from '@angular/compiler/src/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { removeObjectProperties, deepCopy } from 'src/app/shared/utils/common-functions';
import { Subscription, ObservableInput, of, Observable } from 'rxjs';

import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { isObject } from 'util';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  
  doctorList = [];

  total = 0;
  page = 1;
  limit = 12;
  smallNumPages = 0;
  selectedItem=0;

  name = '';
  mapcls = false;

  subCatgorySlug ='';
  // address = '';
  modalRef: BsModalRef;
  sortType = 1;
  parseFloatC = parseFloatC;
  formFilter: UntypedFormGroup;

  searching = false;
  searchFailed = false;


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
  landingData = null;
  availabilities = availabilities;

  categories = [];
  byDefaultCategory = [{ id: '', name: "All Categories", shouldNotDisplay: true }];
  selectedCategory = null;
  selectedValue = this.byDefaultCategory[0];
  categorySlug = null;
  subCategorySlug = null;
  constructor(
    private modalService: BsModalService,
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private GlobalService: GlobalService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.categorySlug = this.route.snapshot.paramMap.get('category');
    console.log("DoctorListComponent -> category", this.categorySlug)
    this.subCategorySlug = this.route.snapshot.paramMap.get('subCategory')
    this.subCatgorySlug = this.subCategorySlug;
    console.log("DoctorListComponent -> subCategory", this.subCategorySlug)
    this.formFilter = this.formBuilder.group(this.formElements());
    this.GlobalService.searchLanding$.subscribe(landingData => {
      console.log("DoctorListComponent -> landingData", landingData)
      if (landingData && isObject(landingData)) {
        this.landingData = landingData;
        this.formFilter.patchValue(landingData);
        if (this.landingData && this.landingData.selectCategory) {
          this.selectedCategory = this.landingData.selectCategory;
        }
      }
    })
  }

  formElements() {
    return {
      category: [''],
      location: [''],
      lat: [''],
      lng: [''],
      availability: [''],
      fees_range: [''],
      low: [''],
      high: [''],
      gender: [''],
      show_nearest: [''],
      radius: [25],
      online_consultation: [''],
      search: [''],
    }
  }

  clickfunct(){

    document.querySelector(".filtblock .advsearch a").parentElement.classList.toggle("active");
    document.querySelector(".filterheader").classList.toggle("show");
  }

  ngOnInit(): void {
    
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });


    if (this.landingData || !isEmptyObject(this.landingData)) {
      
      this.getDoctors();
    }
   
    this.getCategories();

    this.searchAddress();
  }

  openModel(templatea: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatea, {
      ariaDescribedby: 'my-modal-description',
      ariaLabelledBy: 'my-modal-title'
    });
  }
  ngAfterViewInit(): void {
    let self = this;

   
      const script = document.createElement('script');
        // script.src = '/assets/js/select2.js';
        document.head.appendChild(script);

  }

  changegender(genderval){
    
    this.formFilter.get('gender').setValue(genderval);
  }


  clickRout(){
    this.router.navigate(['pages/vendor-register'])
  }

  availabilityfun(timeval){
    
    this.formFilter.get('availability').setValue(timeval);
  }

  radiuschange(radiusval){
      this.formFilter.get('radius').setValue(radiusval)
     
  }

  filtapply(){

    var num1 = ((document.getElementById("lower-value") as HTMLInputElement).innerText);
    var num2 = ((document.getElementById("upper-value") as HTMLInputElement).innerText);

    this.formFilter.get('low').setValue(num1);
      this.formFilter.get('high').setValue(num2);

  }

  selectItem(selectItem) {
    this.selectedCategory = selectItem;
    this.selectedValue = selectItem;
    this.categorySlug = selectItem.slug;
    if (!selectItem.id) {
      this.categorySlug = null;
      this.subCategorySlug = null
    }
    let url = 'pages/vendor-list';
    if (this.categorySlug) {
      url = url + '/' + this.categorySlug;
    }
    // this.router.navigate([url]);
    this.location.replaceState(url);
  }

  selectItemSubCategory(selectItem) {
    // this.selectedSubCategory = selectItem;
    this.selectedValue = selectItem;
    this.subCategorySlug = selectItem.slug;
    let url = 'pages/vendor-list';
    if (this.categorySlug) {
      url = url + '/' + this.categorySlug;
    }
    if (this.subCategorySlug) {
      url = url + '/' + this.subCategorySlug;
    }
    // this.router.navigate([url]);
    this.location.replaceState(url);
  }
  doCategories(event) {
    let index = findIndexInData(this.categories, 'id', parseInt(event.target.value));
    console.log("DoctorListComponent -> doCategories -> index", index)
    if (index != -1) {
      this.categories[index]['checked'] = event.target.checked;
    }
    this.getDoctors();
    console.log("DoctorListComponent -> doCategories -> event", event)

  }

  makeParams() {
    let param: LooseObject = {};
    param['page'] = this.page;
    param['pagination'] = 1;
    param['per_page'] = this.limit;
    param['role_id'] = 4;
    param['sort_order'] = this.sortType;
    param['search'] = this.name;
    param['address'] = this.formFilter.value.location;
    param['status_id'] = 4;
    let cate = this.categories.filter(function (event) {
      return event.checked == true;
    });
    param['categories_id'] = getIdsFromArray(cate, 'id');
    return removeEmptyKeysFromObject(param);
  }

  doFilter() {
    this.getDoctors();
  }

  doSort() {
    this.page = 1;
    this.getDoctors();

  }

  getDoctors() {
    let params = this.makeParams();
    let formValues = deepCopy(this.formFilter.getRawValue());
    // if (formValues['category'] && isObject(formValues['category'])) {
    //   formValues['categories_id[]'] = formValues['category']['id']
    //   delete formValues['category'];
    // }
    // if (this.selectedCategory && isObject(this.selectedCategory)) {
    //   formValues['categories_id[]'] = this.selectedCategory['id']
    //   delete formValues['category'];
    // }

    if (this.categorySlug) {
      formValues['category_slug'] = this.categorySlug;
    }
    if (this.subCategorySlug) {
      formValues['sub_category_slug'] = this.subCategorySlug;
    }
   
    this.requestService.sendRequest(UserUrls.ALL_GET, 'GET', removeEmptyKeysFromObject(mergeRecursive(params, formValues))).subscribe(res => {
      if (res && res.status) {
        this.total = res.result.total;
        this.doctorList = res.result.data;
       
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }


  getCategories() {
    // let params = this.makeParams();
    this.requestService.sendRequest(CategoryUrl.CATEGORY_PAGE_ALL, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.categories = this.byDefaultCategory.concat(res.result.data);
       
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }

  pageChanged(event) {
    console.log("DoctorListComponent -> pageChanged -> event", event);
    this.page = event.page;
    this.getDoctors();
   
  }

  viewProfile(doc) {
    this.router.navigate(['pages/vendor/' + doc.id])
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
  doChange($event) {
    console.log("doChange -> $event", $event)

  }


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

  resetLatLng() {
    this.formFilter.patchValue({
      'location': '',
      lat: '',
      lng: ''
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


          this.formFilter.patchValue({
            'location': place.formatted_address
          });

          console.log("Address Model", this.address);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.formFilter.controls['lat'].setValue(this.latitude);
          this.formFilter.controls['lng'].setValue(this.longitude);
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
      this.formFilter.patchValue({
        'city': this.address.locality,
      });
      // if (!this.address.route && this.address.locality) {
      //   this.address.route = this.address.locality;
      // }
    }
    else if (addressType == "country") {
      this.address.country = val;
      console.log("storeAddress -> val", val)
      this.formFilter.patchValue({
        'country': this.address.country,
      });
      // if (!this.address.route && this.address.country) {
      //   this.address.route = this.address.country;
      // }
    }
    else if (addressType == "administrative_area_level_1") {
      this.address.administrative_area_level_1 = val;
      this.formFilter.patchValue({
        'state': this.address.administrative_area_level_1,
      });
      // if (!this.address.route && this.address.administrative_area_level_1) {
      //   this.address.route = this.address.administrative_area_level_1;
      // }
    }
    else if (addressType == "neighborhood") {
      this.address.neighborhood = val;
      this.formFilter.patchValue({
        'city': this.address.neighborhood,
      });
      // if (!this.address.route && this.address.neighborhood) {
      //   this.address.route = this.address.neighborhood;
      // }
    }
    else if (addressType == "postal_code") {
      this.address.postal_code = val;
      this.formFilter.patchValue({
        'zip': this.address.postal_code,
      });

    }
    else if (addressType == "country") {
      this.address.country = val;
      // if (!this.address.route && this.address.country) {
      //   this.address.route = this.address.country;
      // }
    }
  }

  setLocationOnMap() {
    console.log('called');
    this.mapModal.showMap(parseFloat(this.formFilter.get('lat').value), parseFloat(this.formFilter.get('lng').value));
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
    this.formFilter.patchValue({
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
      this.formFilter.controls['lat'].setValue(this.latitude);
      this.formFilter.controls['lng'].setValue(this.longitude);
      console.log("longtitude", this.longitude);
    }
    console.log("Address Model", this.address);
  }
}
