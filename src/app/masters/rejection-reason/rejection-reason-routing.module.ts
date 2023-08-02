import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RejectionReasonAddComponent } from './rejection-reason-add/rejection-reason-add.component';
import { RejectionReasonEditComponent } from './rejection-reason-edit/rejection-reason-edit.component';
import { RejectionReasonListComponent } from './rejection-reason-list/rejection-reason-list.component';


const routes: Routes = [
  {
    path: '',
    // children: [
    //   { path: '', redirectTo: 'list', pathMatch: 'full' },
    //   {
    //     path: 'add',
    //     component: RejectionReasonAddComponent
    //     ,
    //     data: {
    //       title: 'Rejection Reason Add',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: RejectionReasonEditComponent,
    //     data: {
    //       title: 'Rejection Reason Edit',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'list',
    //     component: RejectionReasonListComponent,
    //     data: {
    //       title: 'Rejection Reason  List',
    //       // permission: RoutesPermissions.default
    //     }
    //   }

    // ],
    // resolve: { route: AclResolverService, state: AclResolverService }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectionReasonRoutingModule { }
