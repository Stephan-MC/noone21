import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesMasterRoutingModule } from './services-master-routing.module';
import { ServicesMasterAddComponent } from './services-master-add/services-master-add.component';
import { ServicesMasterEditComponent } from './services-master-edit/services-master-edit.component';
import { ServicesMasterFormComponent } from './services-master-form/services-master-form.component';
import { ServicesMasterListComponent } from './services-master-list/services-master-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ServicesMasterAddComponent, ServicesMasterEditComponent, ServicesMasterFormComponent, ServicesMasterListComponent],
  imports: [
    CommonModule,
    ServicesMasterRoutingModule,
    SharedModule
  ]
})
export class ServicesMasterModule { }
