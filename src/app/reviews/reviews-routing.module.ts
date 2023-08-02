import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';


const routes: Routes = [
  // {
  //   path: '',
  //   children: [
  //     { path: '', redirectTo: 'list', pathMatch: 'full' },

  //     {
  //       path: 'list',
  //       component: ReviewsListComponent,
  //       data: {
  //         title: 'Reviews List',
  //         // permission: RoutesPermissions.default
  //       }
  //     }

  //   ],
  //   // resolve: { route: AclResolverService, state: AclResolverService }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
