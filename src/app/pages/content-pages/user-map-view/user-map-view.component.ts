import { Component, OnInit, ViewChild, ElementRef, NgZone,TemplateRef } from '@angular/core';
import { getIdsFromArray, removeEmptyKeysFromObject, LooseObject, findIndexInData, parseFloatC, mergeRecursive, availabilities } from 'src/app/shared/utils/common-functions';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// declare var $: any;
import { removeObjectProperties, deepCopy } from 'src/app/shared/utils/common-functions';
import { Subscription, ObservableInput, of, Observable } from 'rxjs';

import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { isObject } from 'util';
import { Marker, MapsAPILoader } from '@agm/core';
import { LocalStorage } from 'src/app/libs/localstorage';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { Address } from 'src/app/shared/shares-model/Address.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-user-map-view',
  templateUrl: './user-map-view.component.html',
  styleUrls: ['./user-map-view.component.scss'],
  providers:[DecimalPipe],
})
export class UserMapViewComponent implements OnInit {

  map: any;
  lat = 54.7227052;
  lng = -113.7222159;
  mapcls = false;
  mapclse = false;
  mapclsa = false;
  doctorList = [];
  modalRef: BsModalRef;
  total = 0;
  page = 1;
  limit = 12;
  smallNumPages = 0;
  selectedItem = 0;
  zoom: number = 11;
  user: any;
  name = '';
  // address = '';

  sortType = 1;
  formFilter: UntypedFormGroup;
  parseFloatC = parseFloatC;

  searching = false;
  searchFailed = false;

  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  @ViewChild(MapModalComponent, { static: true }) mapModal: MapModalComponent;
  address: Address = new Address();
  public latitude: number;
  public longitude: number
  // public zoom: number;
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
textArea = '';


  availabilities = availabilities;
  categories = [];
  byDefaultCategory = [{ id: '', name: "All Categories", shouldNotDisplay: true }];
  selectedCategory = null;
  selectedValue = this.byDefaultCategory[0];;
  categorySlug = null;
  subCategorySlug = null;
  radius = 10000;

  icon = { url: '../../assets/images/icon_logo.png', scaledSize: { height: 55, width: 55 } };
  previous; Window
  constructor(
    private modalService: BsModalService,
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private localStorage: LocalStorage,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    this.formFilter = this.formBuilder.group(this.formElements())
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
      online_consultation: ['']
    }
  }

  ngOnInit(): void {

   
      document.body.classList.add("mapviewpg");

  }


  clickfunct(){

    document.querySelector(".filtblock .advsearch a").parentElement.classList.toggle("active");
    document.querySelector(".filterheader").classList.toggle("show");
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.classList.remove("mapviewpg");
   
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
  ngAfterViewInit(): void {

    const script = document.createElement('script');
    // script.src = '/assets/js/select2.js';
    document.head.appendChild(script);      

    this.getCategories();
  

    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.searchAddress();
    if (this.requestService.isAuthenticated()) {
      this.user = this.localStorage.getObject('user_details');
      if (!this.user.lat && !this.user.lng) {
        this.handlePermission();
      } else {
        this.lat = parseFloat(this.user.lat);
        this.lng = parseFloat(this.user.lng);
        // this.getUsers();
        this.handlePermission();
      }
    } else {
      this.handlePermission();

    }
   

  }

mapexpand(){

  this.mapcls = !this.mapcls;
}

listmapfunction(){
  this.mapclse = !this.mapclse;
}
listfiltfunction(){
  this.mapclsa = !this.mapclsa;
}

  changegender(genderval){
    
    this.formFilter.get('gender').setValue(genderval);
  }

  availabilityfun(timeval){
    
    this.formFilter.get('availability').setValue(timeval);
    console.log(timeval);
  }

  radiuschange(radiusval){
      this.formFilter.get('radius').setValue(radiusval)
      if (radiusval) {
        this.radius = parseInt((radiusval)) * 1000;
      }
  }

  openModel(templatea: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatea, {
      ariaDescribedby: 'my-modal-description',
      ariaLabelledBy: 'my-modal-title'
    });
  }

  filtapply(){

    var num1 = ((document.getElementById("lower-value") as HTMLInputElement).innerText);
    var num2 = ((document.getElementById("upper-value") as HTMLInputElement).innerText);

    this.formFilter.get('low').setValue(num1);
      this.formFilter.get('high').setValue(num2);
  }

  getDoctors() {
    let params = this.makeParams();
    let formValues = this.formFilter.getRawValue();
    if (formValues['category'] && isObject(formValues['category'])) {
      formValues['categories_id[]'] = formValues['category']['id']
    }
    if (this.selectedCategory && isObject(this.selectedCategory)) {
      formValues['categories_id[]'] = this.selectedCategory['id']
      delete formValues['category'];
    }
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
        // if (params['lat'] && params['lng']) {
        //   this.zoom = 11;
        // } else {
        //   this.zoom = 11;
        // }
        console.log("UserMapViewComponent -> getDoctors -> this.zoom", this.zoom)
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

  // selectItem(selectItem) {
  //   this.selectedCategory = selectItem;
  // }
  selectItem(selectItem) {
    this.selectedCategory = selectItem;
    this.selectedValue = selectItem;
    this.categorySlug = selectItem.slug;
    if (!selectItem.id) {
      this.categorySlug = null;
      this.subCategorySlug = null
    }
  }

  selectItemSubCategory(selectItem) {
    // this.selectedSubCategory = selectItem;
    this.selectedValue = selectItem;
    this.subCategorySlug = selectItem.slug;
    // let url = 'pages/doctor-list';
    // if (this.categorySlug) {
    //   url = url + '/' + this.categorySlug;
    // }
    // if (this.subCategorySlug) {
    //   url = url + '/' + this.subCategorySlug;
    // }
    // // this.router.navigate([url]);
    // this.location.replaceState(url);
  }


  pageChanged(event) {
    console.log("DoctorListComponent -> pageChanged -> event", event);
    this.page = event.page;
    this.getDoctors()

  }

  viewProfile(doc) {
    this.router.navigate(['pages/vendor/' + doc.id])
  }

  handlePermission() {
    let self = this;
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
      console.log(result)
      if (result.state == 'granted') {
        self.setCurrentPosition();
        self.report(result.state);
      } else if (result.state == 'prompt') {
        self.setCurrentPosition();
        self.report(result.state);
      } else if (result.state == 'denied') {
        self.getDoctors();
        self.report(result.state);
        self.zoom = 5;
      }
      result.onchange = function () {
        self.report(result.state);
      }
    });
  }

  report(state) {
    console.log('Permission ' + state);
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        let data = {
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
        console.log('data', data);
        this.getDoctors();
      });
    }
  }


  clickedMarker(label: string, index: number, infoWindow) {
    console.log('clicked the marker: ', label);
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  mapClicked($event: any) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
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
      tap(() => {
        console.log('test');
        this.searchFailed = true
      }),
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
      lng: '',
      radius: 25
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

          //set latitude, longitude and zoom;
          // if (place.types.includes("locality")) {
          //   this.radius = this.getRadius(place.geometry.viewport)
          //   var km = this.radius / 1000;
          //   console.log(km.toFixed(1) + " km"); // 1613.8 km
          //   this.formFilter.get('radius').setValue(km.toFixed(1))
          // } else {
          //   this.radius = 10000;
          //   this.formFilter.get('radius').setValue(25);
          // }

          this.latitude = place.geometry.location.lat();
          this.lat = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.lng = place.geometry.location.lng();
          this.formFilter.controls['lat'].setValue(this.latitude);
          this.formFilter.controls['lng'].setValue(this.longitude);
          this.zoom = 11;
          this.doctorList = [];
          this.getDoctors();
        });
      });
    });
  }


  getRadius(place) {
    var lat1 = place.getSouthWest().lat();
    console.log("mapReady -> minLat", lat1)
    var lon1 = place.getSouthWest().lng();
    console.log("mapReady -> minLng", lon1)
    var lat2 = place.getNorthEast().lat();
    console.log("mapReady -> maxLat", lat2)
    var lon2 = place.getNorthEast().lng();
    console.log("mapReady -> maxLng", lon2)
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = (R * c); // in metres
    console.log("getRadius -> d", d)
    // this.radius = d;
    var km = d / 1000;
    console.log(km.toFixed(1) + " km"); // 1613.8 km
    // console.log("getRadius -> d", d)



    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lon1), new google.maps.LatLng(lat2, lon2));
    return distance - 1000;
    var km = d / 1000;
    console.log(km.toFixed(1) + " km"); // 1613.8 km
    console.log("getRadius -> distance", distance)
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
    }
    else if (addressType == "country") {
      this.address.country = val;
      console.log("storeAddress -> val", val)
      this.formFilter.patchValue({
        'country': this.address.country,
      });
    }
    else if (addressType == "administrative_area_level_1") {
      this.address.administrative_area_level_1 = val;
      this.formFilter.patchValue({
        'state': this.address.administrative_area_level_1,
      });

    }
    else if (addressType == "neighborhood") {
      this.address.neighborhood = val;
      this.formFilter.patchValue({
        'city': this.address.neighborhood,
      });
    }
    else if (addressType == "postal_code") {
      this.address.postal_code = val;
      this.formFilter.patchValue({
        'zip': this.address.postal_code,
      });

    }
    else if (addressType == "country") {
      this.address.country = val;
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

  handleCenterChange(event) {
    // console.log("handleCenterChange -> event", event)
  }
  mapReady(map) {
    console.log("mapReady -> map", map)
    this.map = map;
    var that = this;
    this.map.addListener("dragend", function () {
      //do what you want
      console.log(that.map.getCenter().lat(), ' dragend lat');
      console.log(that.map.getCenter().lng(), 'dragend lng');
      that.formFilter.get('lat').setValue(that.map.getCenter().lat());
      that.formFilter.get('lng').setValue(that.map.getCenter().lng());

      // let radius = that.getRadius(that.map.getBounds())
      // var km = radius / 1000;
      // console.log("mapReady -> km", km)
      // console.log(km.toFixed(1) + " km"); // 1613.8 km
      // that.formFilter.get('radius').setValue(km.toFixed(1))

      that.getDoctors();
    });

  }

  onViewMap(property) {
    console.log("onViewMap -> property", property)
    this.lat = parseFloat(property.lat);
    this.lng = parseFloat(property.lng);
    this.zoom = 8;
    setTimeout(() => {
      this.zoom = 17;
    }, 500);

  }

  onfilterClick() {
    alert("çlicked");
  }
}
