import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserUrls } from 'src/app/users/user-urls.enum';
import * as moment from 'moment';
@Component({
  selector: 'app-buyer-view',
  templateUrl: './buyer-view.component.html',
  styleUrls: ['./buyer-view.component.scss']
})
export class BuyerViewComponent implements OnInit {
  id: string;
  moment = moment;
  currentPatient = null;
  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUser(this.id);
  }

  getUser(id) {
    this.requestService.sendRequest(UserUrls.SINGLE_GET + id, 'GET', {}).subscribe(res => {

      if (res && res.status) {
        this.currentPatient = res.result.data;

      } else {

        this.toastrService.error(res.message, 'Error');

      }
    }, error => {
      this.toastrService.error(error.error ? error.error.message : error.message, 'success');

    });
  }

}
