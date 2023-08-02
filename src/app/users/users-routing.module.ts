import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfile2Component } from './user-profile2/user-profile2.component';


const routes: Routes = [

  // {
  //   path: '',
  //   children: [
  //     { path: '', redirectTo: 'list', pathMatch: 'full' },
  //     {
  //       path: 'list',
  //       component: UserListComponent,
  //       data: {
  //         title: 'User List',
  //         permission: "loginDefault"

  //       }
  //     },
  //     {
  //       path: 'userProfile',
  //       component: UserProfileComponent,
  //       data: {
  //         title: 'UserProfile',
  //         permission: "loginDefault"

  //       }
  //     },
  //     {
  //       path: 'userProfile2',
  //       component: UserProfile2Component,
  //       data: {
  //         title: 'UserProfile2',
  //         permission: "loginDefault"

  //       }
  //     },
  //     {
  //       path: 'myProfile',
  //       component: UserProfile2Component,
  //       data: {
  //         title: 'My Profile',
  //         permission: "loginDefault"

  //       }
  //     },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
