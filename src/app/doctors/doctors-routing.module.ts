import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateGigsComponent } from './create-gigs/create-gigs.component';

const routes: Routes = [

  {
   
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
