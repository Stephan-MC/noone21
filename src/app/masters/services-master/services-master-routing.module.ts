import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesMasterAddComponent } from './services-master-add/services-master-add.component';
import { ServicesMasterEditComponent } from './services-master-edit/services-master-edit.component';
import { ServicesMasterListComponent } from './services-master-list/services-master-list.component';


const routes: Routes = [
  {
    path: '',
    // children: [
    //   { path: '', redirectTo: 'list', pathMatch: 'full' },
    //   {
    //     path: 'add',
    //     component: ServicesMasterAddComponent
    //     ,
    //     data: {
    //       title: 'Services Master Add',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: ServicesMasterEditComponent,
    //     data: {
    //       title: 'Services Master Edit',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'list',
    //     component: ServicesMasterListComponent,
    //     data: {
    //       title: 'Services Master List',
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
export class ServicesMasterRoutingModule { }
