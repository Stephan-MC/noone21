import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';
import { RequestService } from 'src/app/shared/services/request.service';
import { makeUnselectAllRows, getIdsFromArray, mergeRecursive, isEmptyObjectKeys, arrayContainsArray, SelectUnCheckItemsOnly, unCheckCurrentPageItems, removeCurrentPageSelectionFromSelected, ifNotCheckedAlreadyAndSelect, getFilterDataFromIds, UnCheckAllCheckBoxAndRemoveCurrentUnselect, removeEmptyKeysFromObject } from 'src/app/shared/utils/common-functions';
import { ReviewUrls } from '../review-urls.enum';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {

  rows: any = [];
  public subscription: Subscription[] = [];
  limit: number = 20;
  activePage: number = 1;
  total: number = 1;
  offset: number = 0;
  is_approved: number = 0;

  disableButton: boolean = false;

  selectedRows = [];
  checkBoxProp = 'checkBoxChecked';
  uniqueProp = 'id';
  checkBoxChecked: boolean = false;
  form: UntypedFormGroup;
  approvesList = [{ value: 0, 'text': 'Not Approved' }, { value: 1, 'text': 'Approved' }];
  isEmptyObjectKeys = isEmptyObjectKeys;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    // private _alert: AlertsService,
    private ngPopups: NgPopupsService,
    private requestService: RequestService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.form = this.formBuilder.group({
      'search': [''],
      "is_approved": [null]
    })
    this.getData(this.makeParams());

  }

  makeParams() {
    let params = {
      "pagination": 1,
      "page": this.activePage,
      "per_page": this.limit,
      "is_approved": this.is_approved
    };
    params = mergeRecursive(params, removeEmptyKeysFromObject(this.form.getRawValue()));
    return params;
  }

  getData(params) {
    this.subscription.push(
      this.requestService.sendRequest(ReviewUrls.ALL_GET, 'get', params).subscribe(res => {
        if (res.status) {
          this.rows = res.result.data;
          this.apiCallSelection()
          console.log("ReviewsListComponent -> getData -> rows", this.rows)
          this.total = res.result.total;
        
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }


  onAdd() {
    this.router.navigate(["add"], { relativeTo: this.route.parent });
  }

  onEdit(data: any) {
    this.router.navigate(["edit/" + data["id"]], {
      relativeTo: this.route.parent
    });
  }

  onDelete(): void {
    this.ngPopups.confirm('Do you  really want to delete these Reviews?')
      .subscribe(res => {
        if (res) {
          console.log('You clicked OK. You dumb.');
          let ids = getIdsFromArray(this.selectedRows, 'id');
          // let delete_params_ids = [row['id']].toString();
          this.disableButton = true;
          this.subscription.push(
            this.requestService.sendRequest(ReviewUrls.DELETE_POST, 'delete_with_body', { ids: ids }).subscribe(res => {
              console.log(res);
              this.disableButton = false;
              if (res && res.status) {
                this.toastrService.success(res.message, "Success");

                this.selectedRows = [];
                makeUnselectAllRows(this.rows, this.checkBoxProp);
                this.getData(this.makeParams());
              } else {
                this.toastrService.error(res.message, "Error");
              }
            }, error => {
              this.disableButton = false;
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
    params["is_approved"] = this.is_approved
    this.getData(this.makeParams());
  }

  approveReview(is_approved) {
    let ids = getIdsFromArray(this.selectedRows, 'id');
    if ((Array.isArray(ids) && ids.length == 0) || !ids) {
      this.toastrService.error('Please select valid Reviews', "Error");
      return false;
    }
    let formData = {
      ids: ids,
      is_approved: is_approved
    }
    this.disableButton = true;
    this.subscription.push(
      this.requestService.sendRequest(ReviewUrls.APPROVE_REVIEW, 'PUT', formData).subscribe(res => {
        this.disableButton = false;
        if (res.status) {
          this.toastrService.success(res.message, "Success");
          this.selectedRows = [];
          makeUnselectAllRows(this.rows, this.checkBoxProp);
          let params = {
            "pagination": 1,
            "page": this.activePage,
            "per_page": this.limit,
            "is_approved": this.is_approved
          };
          this.getData(params);
        } else {
          this.toastrService.error(res.message, "Error");
        }
      }, error => {
        this.disableButton = false;
        this.toastrService.error(error['error'] ? error['error']['message'] : error.message, "Error");
      }));
  }

  //========================================================================================
  /*                                                                                      *
   *                    Called once, before the instance is destroyed.                    *
   *                       Add 'implements OnDestroy' to the class.                       *
   *                                                                                      */
  //========================================================================================

  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }


  removeSelected(array, ids) {
    let self = this;
    this.selectedRows = this.selectedRows.filter(itemX => !ids.includes(itemX[self.uniqueProp]));
  }

  apiCallSelection() {
    makeUnselectAllRows(this.rows, this.checkBoxProp);
    let s = this;
    let selectedIndex2;
    this.selectedRows.forEach(element => {
      selectedIndex2 = s.rows.findIndex(function (selected) {
        return selected.id == element.id;
      });
      if (selectedIndex2 != -1) {
        s.rows[selectedIndex2][s.checkBoxProp] = true;
      }
    });

    let allHave = arrayContainsArray(getIdsFromArray(this.selectedRows, this.uniqueProp), getIdsFromArray(this.rows, this.uniqueProp));
    if (allHave) {
      this.checkBoxChecked = true;
    }
    else {
      this.checkBoxChecked = null;
    }
    if (this.rows.length == 0) {
      this.checkBoxChecked = null;
    }
  }

  selectAll($event) {
    if ($event.srcElement.checked) {
      this.selectedRows = SelectUnCheckItemsOnly(this.rows, this.selectedRows, this.uniqueProp);
    }
    else {
      unCheckCurrentPageItems(this.rows);
      removeCurrentPageSelectionFromSelected(this.rows, this.selectedRows, this.uniqueProp);
    }
  }

  SelectSingle($event, row) {
    if ($event.srcElement.checked) {
      ifNotCheckedAlreadyAndSelect(row, this.rows, this.selectedRows, this.uniqueProp);
      // if (this.containAll(this.selectedSplits, this.rows)) {
      // 	this.checkBoxChecked = true;
      // }
      let self = this;
      let currentPageFilter = this.rows.filter(row => row[self.checkBoxProp] === true);
      let ids = getIdsFromArray(this.rows, this.uniqueProp);
      // let selectedFilter = this.selectedSplits.filter(f => ids.includes(f.split_id));
      let selectedFilter = getFilterDataFromIds(this.selectedRows, ids, this.uniqueProp)
      if (this.rows.length == selectedFilter.length) {
        this.checkBoxChecked = true;
      }
    }
    else {
      UnCheckAllCheckBoxAndRemoveCurrentUnselect(row, this.selectedRows, this.uniqueProp, this, this.checkBoxProp);
    }
  }

  onFilter() {
    this.form.reset();
    this.getData(this.makeParams());
  }

  onReset() {
    this.getData(this.makeParams());
  }

  viewProfile(user) {
    if (user.role_id == 4) {
      this.router.navigate(['vendors/view/' + user.id])
    }
    if (user.role_id == 3) {
      this.router.navigate(['patient/view/' + user.id])
    }
  }
}
