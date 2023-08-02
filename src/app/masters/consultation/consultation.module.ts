import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationListComponent } from './consultation-list/consultation-list.component';
import { ConsultationAddComponent } from './consultation-add/consultation-add.component';
import { ConsultationEditComponent } from './consultation-edit/consultation-edit.component';
import { ConsultationFormComponent } from './consultation-form/consultation-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ConsultationListComponent, ConsultationAddComponent, ConsultationEditComponent, ConsultationFormComponent],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    SharedModule
  ]
})
export class ConsultationModule { }
