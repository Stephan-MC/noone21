import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqMasterAddComponent } from './faq-master-add/faq-master-add.component';
import { FaqMasterEditComponent } from './faq-master-edit/faq-master-edit.component';
import { FaqMasterListComponent } from './faq-master-list/faq-master-list.component';


const routes: Routes = [
  {
    path: '',
    // children: [
    //   { path: '', redirectTo: 'list', pathMatch: 'full' },
    //   {
    //     path: 'add',
    //     component: FaqMasterAddComponent
    //     ,
    //     data: {
    //       title: 'FAQ Add',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: FaqMasterEditComponent,
    //     data: {
    //       title: 'FAQ Edit',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'list',
    //     component: FaqMasterListComponent,
    //     data: {
    //       title: 'FAQ List',
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
export class FaqMasterRoutingModule { }
