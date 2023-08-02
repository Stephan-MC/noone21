import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';



const routes: Routes = [
  {
    path: '',
    // children: [
    //   { path: '', redirectTo: 'list', pathMatch: 'full' },
    //   {
    //     path: 'add',
    //     component: CategoryAddComponent
    //     ,
    //     data: {
    //       title: 'Category Add',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: CategoryEditComponent,
    //     data: {
    //       title: 'Category Edit',
    //       // permission: RoutesPermissions.default
    //     }
    //   },
    //   {
    //     path: 'list',
    //     component: CategoryListComponent,
    //     data: {
    //       title: 'Category List',
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
export class CategoryRoutingModule { }
