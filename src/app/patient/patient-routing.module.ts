import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientViewComponent } from './patient-view/patient-view.component';


const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: PatientListComponent,
        data: {
          title: 'User List',
          permission: "loginDefault"

        }
      },
      {
        path: 'view/:id',
        component: PatientViewComponent,
        data: {
          title: 'View Patient',
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
export class PatientRoutingModule { }
