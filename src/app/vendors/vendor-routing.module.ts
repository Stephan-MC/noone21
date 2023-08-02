import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateGigsComponent } from './create-gigs/create-gigs.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: VendorListComponent,
        data: {
          title: 'Vendor List',
          permission: "loginDefault"

        }
      },
      {
        path: 'view/:id',
        component: VendorProfileComponent,
        data: {
          title: 'Vendor Profile',
          permission: "loginDefault"

        }
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        data: {
          title: 'Edit Profile',
          permission: "loginDefault"

        }
      },
      
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VendorRoutingModule { }
