import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedPostListComponent } from './classified-post-list/classified-post-list.component';
import { ClassifiedPostDetailsComponent } from './classified-post-details/classified-post-details.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ClassifiedPostListComponent,
        data: {
          title: 'Classified  List',
          permission: "loginDefault"

        }
      },{
        path: 'details/:id',
        component: ClassifiedPostDetailsComponent,
            data: {
              title: 'Classified Details',
              permission: "loginDefault"

            }
        }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedRoutingModule { }
