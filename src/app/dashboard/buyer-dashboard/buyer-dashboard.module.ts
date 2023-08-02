import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerDashboardListComponent } from './buyer-dashboard-list/buyer-dashboard-list.component';
import { BuyerDashboardMainComponent } from './buyer-dashboard-main/buyer-dashboard-main.component';
import { BuyerDashboardSidebarComponent } from './buyer-dashboard-sidebar/buyer-dashboard-sidebar.component';
import { BuyerModule } from 'src/app/buyer/buyer.module';
import { BuyerDashboardRoutingModule } from './buyer-dashboard-routing.module';

@NgModule({
  declarations: [BuyerDashboardSidebarComponent, BuyerDashboardMainComponent, BuyerDashboardListComponent],
  imports: [
    CommonModule,
    BuyerDashboardRoutingModule,
    // UsersModule
    BuyerModule
  ]
})
export class BuyerDashboardModule { }
