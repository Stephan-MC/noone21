import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerDashboardMainComponent } from './buyer-dashboard-main/buyer-dashboard-main.component';
import { BuyerDashboardListComponent } from './buyer-dashboard-list/buyer-dashboard-list.component';
// import { MyProfileComponent } from 'src/app/users/my-profile/my-profile.component';
import { BuyerProfileComponent } from 'src/app/buyer/buyer-profile/buyer-profile.component';
import { BuyerAppointmentComponent } from 'src/app/buyer/buyer-appointment/buyer-appointment.component';
import { BuyerTipsComponent } from 'src/app/buyer/buyer-tips/buyer-tips.component';
import { BuyerSettingsComponent } from 'src/app/buyer/buyer-settings/buyer-settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'myDashboard', pathMatch: 'full' },
  {
    path: '',
    component: BuyerDashboardMainComponent,
    children: [
      {
        path: 'myDashboard',
        component: BuyerDashboardListComponent,
        data: {
          title: 'My Dashboard',
          preload: true, delay: false
        }
      },

      {
        path: 'editProfile',
        component: BuyerProfileComponent,
        data: {
          title: 'Edit Profile',
          preload: true, delay: false
        }
      },
      {
        path: 'appointments',
        component: BuyerAppointmentComponent,
        data: {
          title: 'Buyer Appointment',
          preload: true, delay: false
        }
      },
      {
        path: 'tips',
        component: BuyerTipsComponent,
        data: {
          title: 'Buyer Tips',
          preload: true, delay: false
        }
      },
      {
        path: 'settings',
        component: BuyerSettingsComponent,
        data: {
          title: 'Buyer Settings',
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
export class BuyerDashboardRoutingModule { }
