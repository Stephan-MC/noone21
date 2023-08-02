import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/shared/services/request.service';
import { CategoryUrl } from 'src/app/masters/category/category-url.enum';
import { mergeRecursive } from 'src/app/shared/utils/common-functions';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})

export class AllCategoriesComponent implements OnInit {
  categories = [];


  constructor(
    private requestService: RequestService,
    private toastrService: ToastrService,
    private GlobalService: GlobalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    // let params = this.makeParams();
    this.requestService.sendRequest(CategoryUrl.CATEGORY_PAGE_ALL, 'GET', {}).subscribe(res => {
      if (res && res.status) {
        this.categories = res.result.data;

        this.categories.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        })

        console.log("AllCategoriesComponent -> getCategories -> this.categories ", this.categories)
      } else {

      }
    }, error => {

      this.toastrService.error(error.error ? error.error.message : error.message, 'success');
    })
  }
  doSearchClickCategory(item) {
    // if (this.formFilter && !isEmptyObject(this.formFilter.value)) {
    let value = {
      selectCategory: item,
      search: '',
      location: '',
    }
    let params = mergeRecursive(value, {});
    this.GlobalService.searchLanding$.next(params);
    this.router.navigate(['pages/vendor-list']);
    // }
  }

  onClickCategory(item) {
    let value = {
      selectCategory: item,
      search: '',
      location: '',
    }
    let params = mergeRecursive(value, {});
    this.GlobalService.searchLanding$.next(params);
    this.router.navigate(['pages/vendor-list/' + item.slug]);
  }
  onClickSubCategory(sub,cat) {
    console.log("onClickSubCategory -> item", sub);
    let value = {
      selectCategory: cat,
      search: '',
      location: '',
    }
    let params = mergeRecursive(value, {});
    this.GlobalService.searchLanding$.next(params);
    this.router.navigate(['pages/vendor-list/' + cat.slug + '/' + sub.slug]);
  }
}




