import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardMainComponent } from './admin-dashboard-main/admin-dashboard-main.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbRatingModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminDashboardMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AdminDashboardRoutingModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    ModalModule.forRoot(),
    NgbTypeaheadModule,
    PaginationModule.forRoot(),
    NgbRatingModule,
    NgxDatatableModule,
   
  ]
})
export class AdminDashboardModule { }
