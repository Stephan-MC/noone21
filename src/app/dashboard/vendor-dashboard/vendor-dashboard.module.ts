import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorDashboardRoutingModule } from './vendor-dashboard-routing.module';
import { VendorDashboardListComponent } from './vendor-dashboard-list/vendor-dashboard-list.component';
import { VendorDashboardMainComponent } from './vendor-dashboard-main/vendor-dashboard-main.component';
import { VendorDashboardSidebarComponent } from './vendor-dashboard-sidebar/vendor-dashboard-sidebar.component';
import { VendorsModule } from 'src/app/vendors/vendors.module';
import { SharedModule } from 'src/app/shared/shared.module';

// D:\noone21\n121\front\src\app\vendors\vendor-routing.module.ts

@NgModule({
  declarations: [VendorDashboardListComponent, 
    VendorDashboardMainComponent, VendorDashboardSidebarComponent],
  imports: [
    CommonModule,
    VendorDashboardRoutingModule,
    VendorsModule,
    SharedModule,
  ]
})
export class VendorDashboardModule { }
