import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { UserUrls } from 'src/app/users/user-urls.enum';
import { LocalStorage } from 'src/app/libs/localstorage';
import { Router } from '@angular/router';
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: 'app-user-map-list',
  templateUrl: './user-map-list.component.html',
  styleUrls: ['./user-map-list.component.scss']
})
export class UserMapListComponent implements OnInit {

  icon = { url: '../../assets/images/icon_logo.png', scaledSize: { height: 55, width: 55 } };
  zoom: number = 11;
  user: any;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  radius = 5;
  radiusSize = [{ value: 5 }, { value: 10 }, { value: 15 }, { value: 20 }, { value: 25 }, { value: 50 },];
  rows = [];
  total = 0;
  page = 1;
  offset = 0;
  limit = 20;
  infoWindowOpened = null
  previous_info_window = null
  constructor(
    private requestService: RequestService,
    private router: Router,
    private localStorage: LocalStorage) {

    this.radiusSize.forEach((element: any) => {
      element['text'] = element.value + ' KM';
    });

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
    console.log("UserMapListComponent -> this.user ", this.user);
    console.log('test');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  makeParams() {
    let params = {
      pagination: 0,
      lat: this.lat,
      lng: this.lng,
      // radius: this.radius * 1000,
      role_id: 4,
      status_id: 4,
    }
    return params;
  }

  getUsers() {
    this.requestService.sendRequest(UserUrls.ALL_GET, 'GET', this.makeParams()).subscribe(res => {
      console.log("UserMapListComponent -> getUsers -> res", res)
      if (res && res.status) {
        this.total = res.result.total;
        this.rows = res.result.data;
        console.log("UserMapListComponent -> getUsers -> this.rows ", this.rows)
      } else {

      }
    }, error => {

    })
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
        this.getUsers();
      });
    }
  }

  clickedMarker(label: string, index: number) {
    console.log('clicked the marker: ', label)
  }

  mapClicked($event: any) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }



  onRadius() {
    console.log('test');
    this.getUsers();
  }

  pageChanged(event) {
    console.log("pageChanged -> event", event);
  }

  viewProfile(user) {
    if (user.role.id == 4) {
      this.router.navigate(['pages/doctor/' + user.id])
    }
    if (user.role.id == 3) {
      this.router.navigate(['patient/view/' + user.id])
    }
  }
  close_window() {
    if (this.previous_info_window != null) {
      this.previous_info_window.close()
    }
  }

  select_marker(infoWindow) {
    console.log("select_marker -> infoWindow", infoWindow)
    if (this.previous_info_window == null)
      this.previous_info_window = infoWindow;
    else {
      this.infoWindowOpened = infoWindow
      this.previous_info_window.close()
    }
    this.previous_info_window = infoWindow
  }
}
