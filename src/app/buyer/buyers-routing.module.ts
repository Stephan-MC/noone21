import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { BuyerViewComponent } from './buyer-view/buyer-view.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: BuyerListComponent,
        data: {
          title: 'User List',
          permission: "loginDefault"

        }
      },
      {
        path: 'view/:id',
        component: BuyerViewComponent,
        data: {
          title: 'View Buyer',
          permission: "loginDefault"

        }
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyersRoutingModule { }
