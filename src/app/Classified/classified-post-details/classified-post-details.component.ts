import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormsModule,UntypedFormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { emailRegEx } from 'src/app/shared/utils/email-validation_pattern.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { LocalStorage } from 'src/app/libs/localstorage';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { LooseObject, isEmptyObjectKeys, mergeRecursive, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { CommonUrls } from 'src/app/shared/Enums/common-urls.enum';
import { GlobalService } from 'src/app/shared/services/global.service';
import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of, ObservableInput, Subject, Subscription } from 'rxjs';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { MatLegacyAutocompleteTrigger as MatAutocompleteTrigger } from '@angular/material/legacy-autocomplete';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { MapsAPILoader } from '@agm/core';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { MapModalComponent } from 'src/app/shared/components/modals/map-modal/map-modal.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
@Component({
  selector: 'app-classified-post-details',
  templateUrl: './classified-post-details.component.html',
  styleUrls: ['./classified-post-details.component.scss']
})
export class ClassifiedPostDetailsComponent implements OnInit {

  catgories=[];
  classifieds= null;
  id='';
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

    this.id = this.route.snapshot.params['id'];
   }
  
   slideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1,
    "dots": false,
    "autoplay" : false,
    lazyLoad: 'ondemand',
    "infinite": false,
    // asNavFor: '.adthumbnailslider'
  };

  sslideConfig2 = {
          "slidesToShow": 4, "slidesToScroll": 1,
          "dots": false,
          "autoplay" : false,         
          adaptiveHeight: true,
          "infinite": false,
          asNavFor: '.admainslider',
          focusOnSelect: true,
          lazyLoad: 'ondemand',
          centerMode: false,
          responsive: [
            {
              breakpoint: 700,
              settings: {
                arrows: false,
                slidesToShow: 4
              }
            },
            {
              breakpoint: 500,
              settings: {
                arrows: false,
                slidesToShow: 3
              }
            },
            {
              breakpoint: 400,
              settings: {
                arrows: false,
                slidesToShow: 3
              }
            }
          ]
        };

  slickInit(e) {
    console.log('slick initialized');
  }
 
   detailsClassified(id){
     console.log(id);
      this.requestService.sendRequest('classified/post/getSingle', 'GET', {'id':id}).subscribe(res => {
        if (res && res.status) {
          this.classifieds = res.result.data;
        
        } else {
  
        }
      }, error => {
  
        this.toastrService.error(error.error ? error.error.message : error.message, 'success');
      })


   }
  ngOnInit(): void {
      this.detailsClassified(this.id);
    
  }

}
