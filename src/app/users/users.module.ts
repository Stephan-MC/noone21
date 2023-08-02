import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfile2Component } from './user-profile2/user-profile2.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [UserListComponent, UserProfileComponent, UserProfile2Component, MyProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    ModalModule.forRoot(),
    NgbTypeaheadModule,
    NgbRatingModule
  ]
})
export class UsersModule { }
