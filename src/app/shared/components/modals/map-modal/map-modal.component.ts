import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapUrls } from './map-urls.enum';
import { UntypedFormGroup } from '@angular/forms';
import { AgmMap } from '@agm/core';
import { Address } from 'src/app/shared/shares-model/Address.model';
import { RequestService } from 'src/app/shared/services/request.service';
import { Config } from 'src/app/config/config';
declare var require: any;
import { ModalDirective } from 'ngx-bootstrap/modal';
declare var navigator: any;
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit {
  @Output() onDoneEvent = new EventEmitter();
  currentPlace: any;
  showTable: boolean;
  machine = [];
  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name',
    neighborhood: 'long_name'

  };
  zoom = 12;
  address: Address = new Address();
  selectedLat = 0;
  selectedLng = 0;
  selectedState = '';
  latitude = 0;
  longitude = 0;
  city = '';
  state = '';
  @ViewChild('mapModal', { static: false }) mapModal: ModalDirective;
  @ViewChild('tableBody', { static: false }) tableBody;
  @ViewChild(AgmMap, { static: false }) public agmMap: AgmMap;
  form: UntypedFormGroup;
  constructor(
    private requestService: RequestService, private config: Config,
  ) {
  }

  ngOnInit() {
    this.showTable = false;
  }

  showMap(latitude = null, longitude = null) {
    if (latitude && longitude) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.mapModal.show();
    } else {
      this.handlePermission();
      // navigator.permissions.revoke({ name: 'geolocation' }).then(function (result) {
      //   console.log('geolocation')
      //   this.setCurrentPosition();
      // });
    }
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
        self.report(result.state);
      }
      result.onchange = function () {
        self.report(result.state);
      }
    });
  }

  report(state) {
    console.log('Permission ' + state);
  }

  closeMap() {
    this.showTable = false;
    this.mapModal.hide();
  }

  OnDrag(event) {
    console.log('drag', event);
    const geocoder = new google.maps.Geocoder();
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    const my_location = {
      lat: event.coords.lat,
      lng: event.coords.lng,
      key: this.config.getConfig('mapKey')
    };
    this.requestService.getLocation(my_location).subscribe((res: any) => {
      console.log('loc', res);
      if (res.results.length > 0) {
        let place = res.results.find((product) => {
          return product.address_components.some((item1) => {
            return item1.types.some((item) => {
              return item === 'route';
              // return item === 'route' || item === 'locality' || item === 'neighborhood' || item === 'administrative_area_level_3' || item === 'administrative_area_level_1';
            });
          });
        });
        console.log('d', place);
        if (place) {
          this.currentPlace = place;
        }
        else {
          place = res.results[0];
          this.currentPlace = res.results[0];
        }

        if (!place) {
          return;
        }
        if (place['geometry'] === undefined || place['geometry'] === null) {
          return;
        }
        this.zoom = 12;
      }
    })
  }

  storeAddress(addressType: any, val: any) {
    if (addressType == "street_number") {

      // this.address.street_number = val;
    }

    // else if (addressType == "route") {
    //   this.address.route = val;
    // }
    else if (addressType == "locality") {
      // this.address.locality = val;
      this.city = val;
    }
    else if (addressType == "administrative_area_level_1") {
      this.state = val;

    }
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        let data = {
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
        this.OnDrag(data);
        this.mapModal.show();
        this.zoom = 12;
      });
    }
  }
  onDone() {
    this.mapModal.hide();
    this.onDoneEvent.emit(this.currentPlace);
  }
}
