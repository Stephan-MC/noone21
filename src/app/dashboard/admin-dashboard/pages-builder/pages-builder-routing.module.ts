import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListPagesComponent } from './list-pages/list-pages.component';
import { AddPageComponent } from './add-page/add-page.component';
import { AddContentComponent } from './add-content/add-content.component';
import { AdminDashboardMainComponent } from '../admin-dashboard-main/admin-dashboard-main.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: '',
    component: AdminDashboardMainComponent,
    children: [
      {
        path: '',
        component: ListPagesComponent,
      },
      {
        path: 'add-pages',
        component: AddPageComponent,
      },
      {
        path: 'create-page-content',
        component: AddContentComponent,
      },
      {
        path: 'edit-pages/:id',
        component: EditPageComponent,
      }
      
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesBuilderRoutingModule { }
