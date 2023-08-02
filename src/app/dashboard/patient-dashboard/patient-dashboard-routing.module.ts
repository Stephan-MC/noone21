import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDashboardMainComponent } from './patient-dashboard-main/patient-dashboard-main.component';
import { PatientDashboardListComponent } from './patient-dashboard-list/patient-dashboard-list.component';
// import { MyProfileComponent } from 'src/app/users/my-profile/my-profile.component';
import { PatientProfileComponent } from 'src/app/patient/patient-profile/patient-profile.component';
import { PatientAppointmentComponent } from 'src/app/patient/patient-appointment/patient-appointment.component';
import { PatientTipsComponent } from 'src/app/patient/patient-tips/patient-tips.component';
import { PatientSettingsComponent } from 'src/app/patient/patient-settings/patient-settings.component';


const routes: Routes = [
  { path: '', redirectTo: 'myDashboard', pathMatch: 'full' },
  {
    path: '',
    component: PatientDashboardMainComponent,
    children: [
      {
        path: 'myDashboard',
        component: PatientDashboardListComponent,
        data: {
          title: 'My Dashboard',
          preload: true, delay: false
        }
      },

      {
        path: 'editProfile',
        component: PatientProfileComponent,
        data: {
          title: 'Edit Profile',
          preload: true, delay: false
        }
      },
      {
        path: 'appointments',
        component: PatientAppointmentComponent,
        data: {
          title: 'Patient Appointment',
          preload: true, delay: false
        }
      },
      {
        path: 'tips',
        component: PatientTipsComponent,
        data: {
          title: 'Patient Tips',
          preload: true, delay: false
        }
      },
      {
        path: 'settings',
        component: PatientSettingsComponent,
        data: {
          title: 'Patient Settings',
          preload: true, delay: false
        }
      },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDashboardRoutingModule { }
