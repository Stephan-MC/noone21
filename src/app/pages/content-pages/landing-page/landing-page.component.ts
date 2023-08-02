import { Component, OnInit, ViewChild, ElementRef, NgZone, TemplateRef   } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LooseObject, parseFloatC, isEmptyObject, mergeRecursive } from 'src/app/shared/utils/common-functions';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { Address } from 'src/app/shared/shares-model/Address.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { template } from 'lodash';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  doctorList = [];
  total = 0;
  page = 1;
  limit = 4;
  dopd =false;
  smallNumPages = 0;
  selectedItem = 0;
  // cookieValue = '';
  sortType = 1;
  parseFloatC = parseFloatC;
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  @ViewChild('clckbtns') testclick: ElementRef;
  // @ViewChild(MapModalComponent, { static: true }) mapModal: MapModalComponent;
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
  formFilter: FormGroup;
  byDefaultCategory = [{ id: '', name: "All Categories", slug: '', shouldNotDisplay: true }];

  selectedCategory = null;
  selectedSubCategory = null;
  selectedValue = this.byDefaultCategory[0];;

  categories = [];
  Search = '';
  categoriesALL = [];

  modalRef: BsModalRef;
  customOptions: OwlOptions = {
    loop: true,
		rewind: false,
		margin: 25,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		dots: false,
		nav: false,
		responsive: {
			0: {
				items: 2,			
        margin: 15
			},
			600: {
				items: 3,			
        margin: 15
			},
			768: {
				items: 4,			
        margin: 15
			},
			992: {
				items: 5,
				
			}
		}
  }
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
   private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private GlobalService: GlobalService,
    private modalService: BsModalService
    // private cookieService: CookieService,
  ) {
   
    if (this.requestService.isAuthenticated()) {
      let user = this.requestService.getLoggedInUser();
      if (user && user.role.id == 1) {
        // this.router.navigate(['dashboard/admin']);
      }
    }
    this.formFilter = this.formBuilder.group(this.formElements())
  }



  formElements() {
    return {
      location: [''],
      lat: [''],
      lng: [''],
    }
  }


  ngOnInit(): void { 
    this.getCategoriesALL();
   }
    

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      ariaDescribedby: 'my-modal-description',
      ariaLabelledBy: 'my-modal-title'
    });
  }


  ngAfterViewInit(): void {
   
    this.getCategoriesALL();

    setTimeout(() => {
      this.testclick.nativeElement.click()
    }, 3000);
  }


  ngOnDestroy(): void {
     document.body.classList.remove("homeviewpg");
  }
  makeParams() {
    let param: LooseObject = {};
    param['page'] = this.page;
    param['pagination'] = 1;
    param['per_page'] = this.limit;
    param['role_id'] = 4;
    param['sort_order'] = this.sortType;
    param['status_id'] = 4;
    return param;
  }

  selectItem(selectItem) {
    this.selectedCategory = selectItem;
    this.selectedValue = selectItem;
    console.log("LandingPageComponent -> selectItem -> this.selectedValue", this.selectedValue)
    if (!selectItem.id) {
      this.selectedCategory = null;
      this.selectedSubCategory = null;
    }

  }


  selectItemSubCategory(selectItem) {
    this.selectedSubCategory = selectItem;
    this.selectedValue = selectItem;
 
    // let params = this.makeParams();
    this.requestService.sendRequest(CategoryUrl.CATEGORY_PAGE_ALL, 'GET', { is_home: 1 }).subscribe(res => {
      if (res && res.status) {
        // this.categoriesALL = res.result.data;
        // this.categories = this.byDefaultCategory.concat(res.result.data);
        this.categories=res.result.data;
        this.getCategoriesALL();
        
       
        // this.categories = (res.result.data);
      } else {

      }
    }, error => {
      setTimeout(() => this.toastrService.error(error.error ? error.error.message : error.message, 'success'))
      ;
      
    })
  }



  doSort() {
    this.page = 1;
  }

  getCategoriesALL() {
    // let params = this.makeParams();
    this.requestService.sendRequest(CategoryUrl.CATEGORY_PAGE_ALL, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.categoriesALL = res.result.data;
        this.searchAddress();
      } else {

      }
    }, error => {
      setTimeout(() => this.toastrService.error(error.error ? error.error.message : error.message, 'success'))
      ;
  
    })
  }

  getDoctors() {
    let params = this.makeParams();
    this.requestService.sendRequest(UserUrls.ALL_GET, 'GET', params).subscribe(res => {
      if (res && res.status) {
        this.total = res.result.total;
        this.doctorList = res.result.data;
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }

  // pageChanged(event) {
  //   console.log("DoctorListComponent -> pageChanged -> event", event);
  //   this.page = event.page;
  //   this.getDoctors()

  // }

  goToList() {
    this.router.navigate(['pages/doctor-list'])
  }

  viewProfile(doc) {
    this.router.navigate(['pages/doctor/' + doc.id])
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
    // this.mapModal.showMap(parseFloat(this.formFilter.get('lat').value), parseFloat(this.formFilter.get('lng').value));
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

  doSearch() {
    // if (this.formFilter && !isEmptyObject(this.formFilter.value)) {
    let value = {
      selectCategory: this.selectedCategory,
      search: this.Search,
      location: this.Search,
    }
    let params = mergeRecursive(value, this.formFilter.getRawValue());
    this.GlobalService.searchLanding$.next(params);
    // this.router.navigate(['pages/doctor-list']);
    this.GlobalService.searchLanding$.next(params);
    let url = 'pages/vendor-list';
    if (this.selectedCategory) {
      url = url + '/' + this.selectedCategory.slug;
    }
    if (this.selectedSubCategory) {
      url = url + '/' + this.selectedSubCategory.slug;
    }
    this.router.navigate([url]);
    // }
  }

  doSearchClickCategory(item) {
    // if (this.formFilter && !isEmptyObject(this.formFilter.value)) {
    this.selectedCategory = item;
    let value = {
      selectCategory: this.selectedCategory,
      search: this.Search,
      location: this.Search,
    }
    let params = mergeRecursive(value, this.formFilter.getRawValue());
    this.GlobalService.searchLanding$.next(params);
    let url = 'pages/vendor-list';
    if (this.selectedCategory) {
      url = url + '/' + this.selectedCategory.slug;
    }
    // if (this.selectedSubCategory) {
    //   url = url + '/' + this.selectedSubCategory.slug;
    // }
    this.router.navigate([url]);

    // }
  }
}
