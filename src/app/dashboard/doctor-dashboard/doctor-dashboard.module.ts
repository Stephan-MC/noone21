import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';
import { DoctorDashboardListComponent } from './doctor-dashboard-list/doctor-dashboard-list.component';
import { DoctorDashboardMainComponent } from './doctor-dashboard-main/doctor-dashboard-main.component';
import { DoctorDashboardSidebarComponent } from './doctor-dashboard-sidebar/doctor-dashboard-sidebar.component';
import { VendorsModule } from 'src/app/doctors/doctors.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { UsersModule } from 'src/app/users/users.module';


@NgModule({
  declarations: [DoctorDashboardListComponent, DoctorDashboardMainComponent,
     DoctorDashboardSidebarComponent],
  imports: [
    CommonModule,
    DoctorDashboardRoutingModule,
    // UsersModule,
    DoctorsModule,
    SharedModule,
  ]
})
export class DoctorDashboardModule { }
