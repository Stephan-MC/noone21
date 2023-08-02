import { Component, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { RequestService } from 'src/app/shared/services/request.service';
import { isEmptyObjectKeys, isObject } from 'src/app/shared/utils/common-functions';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NgPopupsService } from 'ng-popups';
import { Observable, ObservableInput, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-requestleads-list',
  templateUrl: './requestleads-list.component.html',
  styleUrls: ['./requestleads-list.component.scss']
})
export class RequestleadsListComponent implements OnInit {

  // row data
  Request=null;
  public ColumnMode = ColumnMode;
  @ViewChild('modal', { static: false }) modal: ModalDirective;
  @ViewChild('content') modalTemplate: TemplateRef<any>;;
  searching = false;
  searchFailed = false;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private tempData = [];
  // rows: any = DatatableData;
  rows: any = [];
  public subscription: Subscription[] = [];
  limit: number = 20;
  activePage: number = 1;
  total: number = 0;
  offset: number = 0;
  fg: FormGroup;
  selectedUser: any;
  isEmptyObjectKeys = isEmptyObjectKeys;
  modelRef = null;
  search = '';
  property = null;
  closeResult = '';
  status = '';
  selected = null;
  modalRef: NgbModalRef;
  constructor(public router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private ngPopups: NgPopupsService,
    private requestService: RequestService) {
      let params = {
        "pagination": 1,
        "page": this.activePage,
        "per_page": this.limit
      };
      this.getData(params);
     }
   
  ngOnInit(): void { }
  onEdit(data: any) {
    this.router.navigate(["edit/" + data["id"]], {
      relativeTo: this.route.parent
    });
  }
  open(content) {
    this.selected = content;
    this.status = content.status;
    this.modalRef = this.modalService.open(this.modalTemplate, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getData(params) {
    params['order'] = "desc";
    if (this.property && isObject(this.property)) {
      params['property_id'] = this.property['id'];
    }
    this.subscription.push(
      this.requestService.sendRequest('master/requestlead/list', 'get', params).subscribe(res => {
        console.log("UserListComponent -> getData -> res", res);
        if (res.status) {
          this.rows = res.result.data;
          this.total = res.result.total;
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }
  onDelete(row: any): void {
    this.ngPopups.confirm('Do you  really want to delete this category?')
      .subscribe(res => {
        if (res) {
          console.log('You clicked OK. You dumb.');
          let delete_params_ids = [row['id']];
          // let delete_params_ids = [row['id']].toString();
          this.subscription.push(
            this.requestService.sendRequest('master/requestlead/delete', 'delete_with_body', { ids: delete_params_ids }).subscribe(res => {
              console.log(res);
              if (res && res.status) {
                this.toastrService.success(res.message, "Success");
                let params = {
                  "pagination": 1,
                  "page": this.activePage,
                  "per_page": this.limit
                };
                this.getData(params);
              } else {
                this.toastrService.error(res.message, "Error");
              }
            }, error => {
              this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
              console.error(
                "Please try again! Something went wrong",
                "Error", error['error'] ? error['error']['message'] : error.message
              );
            }));
        } else {
          console.log('You clicked Cancel. You smart.');
        }
      });

  }

  onPageChange(event) {
    console.log(event);
    this.limit = event.limit;
    this.offset = event.offset;
    this.activePage = event.offset + 1;
    let params = {};
    params['pagination'] = 1;
    params['page'] = this.activePage;
    params['per_page'] = this.limit;
    this.getData(params);
  }

  doFilter() {
    this.offset = 0;
    this.activePage = 1
    let params = {};
    params['pagination'] = 1;
    params['page'] = this.activePage;
    params['per_page'] = this.limit;
    params['search'] = this.search;
    this.getData(params);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  changeStatus() {
    let data = this.selected;
    data.status_code = this.status;
    this.requestService.sendRequest('master/requestlead/edit', 'put', data).subscribe(res => {
      console.log("PropertyLeadsListComponent -> changeStatus -> res", res)
      console.log(res);
      if (res && res.status) {
        this.toastrService.success(res.message, "Success");
        this.modalRef.dismiss();
        let params = {
          "pagination": 1,
          "page": this.activePage,
          "per_page": this.limit
        };
        this.getData(params);
      } else {
        this.toastrService.error(res.message, "Error");
      }
    }, error => {
      this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      console.error(
        "Please try again! Something went wrong",
        "Error", error['error'] ? error['error']['message'] : error.message
      );
    })
  }
}
