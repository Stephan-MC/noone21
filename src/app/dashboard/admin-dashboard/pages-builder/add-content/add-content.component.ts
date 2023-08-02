import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  @Input() id;
  @Input() pageCont;
  constructor(public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private requestService: RequestService,) { }

  ngOnInit(): void {
  }
  formSubmitted($event){
    this.requestService.sendRequest('admin/page/content/add', 'post', $event).subscribe(res => {
      if (res.status) {
        this.toastrService.success(res.message, "Success");
        // this.router.navigate(['dashboard/admin/page-builder']);
      } else {
        this.toastrService.error(res.message, "Error");
      }
    }, error => {
      this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
    })
  }
  
}
