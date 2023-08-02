import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDashboardListComponent } from './doctor-dashboard-list/doctor-dashboard-list.component';
import { DoctorDashboardMainComponent } from './doctor-dashboard-main/doctor-dashboard-main.component';
import { MyProfileComponent } from 'src/app/users/my-profile/my-profile.component';
import { EditProfileComponent } from 'src/app/doctors/edit-profile/edit-profile.component';
import { MessagesComponent } from 'src/app/doctors/messages/messages.component';
import { AppointmentsComponent } from 'src/app/doctors/appointments/appointments.component';
import { DoctorFavoritesComponent } from 'src/app/doctors/doctor-favorites/doctor-favorites.component';
import { DoctorTipsComponent } from 'src/app/doctors/doctor-tips/doctor-tips.component';
import { DoctorReviewsComponent } from 'src/app/doctors/doctor-reviews/doctor-reviews.component';
import { DoctorEditComponentComponent } from 'src/app/doctors/doctor-edit-component/doctor-edit-component.component';
import { GigsComponent } from 'src/app/doctors/gigs/gigs.component';
import { CreateGigsComponent } from 'src/app/doctors/create-gigs/create-gigs.component';


const routes: Routes = [
  { path: '', redirectTo: 'myDashboard', pathMatch: 'full' },
  {
    path: '',
    component: DoctorDashboardMainComponent,
    children: [
      {
        path: 'myDashboard',
        component: DoctorDashboardListComponent,
        data: {
          title: 'My Dashboard',
          preload: true, delay: false
        }
      },

      {
        path: 'editProfile',
        component: DoctorEditComponentComponent,
        data: {
          title: 'Edit Profile',
          preload: true, delay: false
        }
      },

      {
        path: 'messages',
        component: MessagesComponent,
        data: {
          title: 'Message Component ',
          preload: true, delay: false
        }
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        data: {
          title: 'Doctor Appointment',
          preload: true, delay: false
        }
      }, {
        path: 'favorites',
        component: DoctorFavoritesComponent,
        data: {
          title: 'Doctor Favorites',
          preload: true, delay: false
        }
      },
      {
        path: 'tips',
        component: DoctorTipsComponent,
        data: {
          title: 'Patient Tips',
          preload: true, delay: false
        }
      },
      {
        path: 'reviews',
        component: DoctorReviewsComponent,
        data: {
          title: 'Doctor Reviews',
          preload: true, delay: false
        }
      },
      {
        path: 'gigs',
        component: GigsComponent,
        data: {
          title: 'Doctor Gigs',
          preload: true, delay: false
        }
      },
      {
        path: 'create-gigs',
        component: CreateGigsComponent,
        data: {
          title: 'Create Gigs',
          permission: "loginDefault"

        }
      },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorDashboardRoutingModule { }
