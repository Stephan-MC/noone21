import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultationListComponent } from './consultation-list/consultation-list.component';
import { ConsultationAddComponent } from './consultation-add/consultation-add.component';
import { ConsultationEditComponent } from './consultation-edit/consultation-edit.component';


const routes: Routes = [
  {
    path: '',
    // children: [
    //   { path: '', redirectTo: 'list', pathMatch: 'full' },
    //   {
    //     path: 'add',
    //     component: ConsultationAddComponent
    //     ,
    //     data: {
    //       title: 'Consultation Add',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: ConsultationEditComponent,
    //     data: {
    //       title: 'Consultation Edit',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'list',
    //     component: ConsultationListComponent,
    //     data: {
    //       title: 'Consultation List',
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
export class ConsultationRoutingModule { }
