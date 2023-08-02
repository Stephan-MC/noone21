import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PatientDashboardSidebarComponent } from './patient-dashboard-sidebar/patient-dashboard-sidebar.component';
import { PatientDashboardMainComponent } from './patient-dashboard-main/patient-dashboard-main.component';
import { PatientDashboardListComponent } from './patient-dashboard-list/patient-dashboard-list.component';
import { UsersModule } from 'src/app/users/users.module';
import { PatientModule } from 'src/app/patient/patient.module';


@NgModule({
  declarations: [PatientDashboardSidebarComponent, PatientDashboardMainComponent, PatientDashboardListComponent],
  imports: [
    CommonModule,
    PatientDashboardRoutingModule,
    // UsersModule
    PatientModule
  ]
})
export class PatientDashboardModule { }
