import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { PatientTipsComponent } from './patient-tips/patient-tips.component';
import { PatientSettingsComponent } from './patient-settings/patient-settings.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [PatientListComponent, PatientProfileComponent, PatientViewComponent, PatientAppointmentComponent, PatientTipsComponent, PatientSettingsComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    QuillModule.forRoot(),
    NgSelectModule
  ]
})
export class PatientModule { }
