import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { RequestleadsListComponent } from './requestleads-list/requestleads-list.component';

const routes: Routes = [
  {
    path: '',
    // children: [
    //   { path: '', redirectTo: 'list', pathMatch: 'full' },
    //   {
    //     path: 'list',
    //     component: RequestleadsListComponent
    //     ,
    //     data: {
    //       title: 'request list',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'edit',
    //     component: EditComponent
    //     ,
    //     data: {
    //       title: 'request edit',
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
export class RequestLeadsRoutingModule { }
