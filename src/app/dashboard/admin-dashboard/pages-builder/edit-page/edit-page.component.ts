import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
 id:null;
 editData: any;
  constructor(public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private requestService: RequestService,) { }
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.getSinglePage(this.id);
  }
  formSubmitted($event){
    this.requestService.sendRequest('admin/page/edit', 'put', $event).subscribe(res => {
      if (res.status) {
        this.toastrService.success(res.message, "Success");
        this.router.navigate(['dashboard/admin/page-builder/edit-pages/'+this.id]);
      } else {
        this.toastrService.error(res.message, "Error");
      }
    }, error => {
      this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
    })
  }
  getSinglePage(id){
    this.requestService.sendRequest('admin/page/getSingle', 'get',{id:id}).subscribe(res => {
      if (res.status) {
        this.editData=res.result.data[0];
        // this.toastrService.success(res.message, "Success");
        // this.router.navigate(['pages']);
      } else {
        this.toastrService.error(res.message, "Error");
      }
    }, error => {
      this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
    })
  }

}
