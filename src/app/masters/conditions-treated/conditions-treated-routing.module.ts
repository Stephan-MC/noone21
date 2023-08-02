import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConditionsTreatedAddComponent } from './conditions-treated-add/conditions-treated-add.component';
import { ConditionsTreatedEditComponent } from './conditions-treated-edit/conditions-treated-edit.component';
import { ConditionsTreatedListComponent } from './conditions-treated-list/conditions-treated-list.component';


const routes: Routes = [
  {
    // path: '',
    // children: [
    //   { path: '', redirectTo: 'list', pathMatch: 'full' },
    //   {
    //     path: 'add',
    //     component: ConditionsTreatedAddComponent
    //     ,
    //     data: {
    //       title: 'Conditions Treated Add',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: ConditionsTreatedEditComponent,
    //     data: {
    //       title: 'Conditions Treated Edit',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'list',
    //     component: ConditionsTreatedListComponent,
    //     data: {
    //       title: 'Conditions Treated List',
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
export class ConditionsTreatedRoutingModule { }
