import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMapListComponent } from './user-map-list/user-map-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

      {
        path: 'list',
        component: UserMapListComponent,
        data: {
          title: 'user map List',
          // permission: RoutesPermissions.default
        }
      }

    ],
    // resolve: { route: AclResolverService, state: AclResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMapRoutingModule { }
