import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorDashboardListComponent } from './vendor-dashboard-list/vendor-dashboard-list.component';
import { VendorDashboardMainComponent } from './vendor-dashboard-main/vendor-dashboard-main.component';
import { MyProfileComponent } from 'src/app/users/my-profile/my-profile.component';
import { EditProfileComponent } from 'src/app/vendors/edit-profile/edit-profile.component';
import { MessagesComponent } from 'src/app/vendors/messages/messages.component';
import { AppointmentsComponent } from 'src/app/vendors/appointments/appointments.component';
import { VendorFavoritesComponent } from 'src/app/vendors/vendor-favorites/vendor-favorites.component';
import { VendorTipsComponent } from 'src/app/vendors/vendor-tips/vendor-tips.component';
import { VendorReviewsComponent } from 'src/app/vendors/vendor-reviews/vendor-reviews.component';
import { VendorEditComponentComponent } from 'src/app/vendors/vendor-edit-component/vendor-edit-component.component';
import { GigsComponent } from 'src/app/vendors/gigs/gigs.component';
import { CreateGigsComponent } from 'src/app/vendors/create-gigs/create-gigs.component';
import { RequestToDeleteDataComponent } from 'src/app/vendors/request-to-delete-data/request-to-delete-data.component';
import { VendorAdvSettingComponent } from 'src/app/vendors/vendor-adv-setting/vendor-adv-setting.component';

import { ResetPasswordComponent } from 'src/app/vendors/reset-password/reset-password.component';
import { ClassifiedAddComponent } from 'src/app/vendors/classified/classified-add/classified-add.component';
import { ClassifiedListviewComponent } from 'src/app/vendors/classified/classified-listview/classified-listview.component';
import { ClassifiedEditComponent } from 'src/app/vendors/classified/classified-edit/classified-edit.component';
import { UserMessagesComponent } from 'src/app/vendors/user-messages/user-messages.component';

// import { AddComponent } from '../../vendors/classified/add/add.component';
// import { EditComponent } from '../../vendors/classified/edit/edit.component';
// import { ListViewComponent } from '../../vendors/classified/list-view/list-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'myDashboard', pathMatch: 'full' },
  {
    path: '',
    component: VendorDashboardMainComponent,
    children: [
      {
        path: 'myDashboard',
        component: VendorDashboardListComponent,
        data: {
          title: 'My Dashboard',
          preload: true, delay: false
        }
      },

      {
        path: 'editProfile',
        component: VendorEditComponentComponent,
        data: {
          title: 'Edit Profile',
          preload: true, delay: false
        }
      }, {
        path: 'advance-setting',
        component: VendorAdvSettingComponent,
        data: {
          title: 'Advance Setting Profile',
          preload: true, delay: false
        }
      }, {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
          title: 'Profile Reset Password',
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
          title: 'Vendor Appointment',
          preload: true, delay: false
        }
      }, {
        path: 'favorites',
        component: VendorFavoritesComponent,
        data: {
          title: 'Vendor Favorites',
          preload: true, delay: false
        }
      },
      {
        path: 'tips',
        component: VendorTipsComponent,
        data: {
          title: 'Patient Tips',
          preload: true, delay: false
        }
      },
      {
        path: 'reviews',
        component: VendorReviewsComponent,
        data: {
          title: 'Vendor Reviews',
          preload: true, delay: false
        }
      },{
        path: 'user-messages',
        component: UserMessagesComponent,
        data: {
          title: 'User Messages',
          preload: true, delay: false
        }
      },
      {
        path: 'gigs',
        component: GigsComponent,
        data: {
          title: 'Vendor Gigs',
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
      {
        path: 'request-to-delete-data',
        component: RequestToDeleteDataComponent,
        data: {
          title: 'Request to Delete Data',
          permission: "loginDefault"
    
        }
      },
      {
        path: 'classified/edit/:token/:id',
        component: ClassifiedEditComponent,
        data: {
          title: 'Edit Profile',
          permission: "loginDefault"

        }
      },
      {
        path: 'classified/add',
        component: ClassifiedAddComponent,
        data: {
          title: 'Edit Profile',
          permission: "loginDefault"

        }
      },
      {
        path: 'classified/post/list',
        component: ClassifiedListviewComponent,
        data: {
          title: 'Edit Profile',
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
export class VendorDashboardRoutingModule { }
