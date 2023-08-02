import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
 
  constructor(public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private requestService: RequestService,) { }
  ngOnInit(): void {
  }
  formSubmitted($event){
    this.requestService.sendRequest('admin/page/add', 'post', $event).subscribe(res => {
      if (res.status) {
        this.toastrService.success(res.message, "Success");
         this.router.navigate(['dashboard/admin/page-builder/add-pages']);
      } else {
        this.toastrService.error(res.message, "Error");
      }
    }, error => {
      this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
    })
  }

}
