import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RejectionReasonRoutingModule } from './rejection-reason-routing.module';
import { RejectionReasonListComponent } from './rejection-reason-list/rejection-reason-list.component';
import { RejectionReasonAddComponent } from './rejection-reason-add/rejection-reason-add.component';
import { RejectionReasonEditComponent } from './rejection-reason-edit/rejection-reason-edit.component';
import { RejectionReasonFormComponent } from './rejection-reason-form/rejection-reason-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RejectionReasonListComponent, RejectionReasonAddComponent, RejectionReasonEditComponent, RejectionReasonFormComponent],
  imports: [
    CommonModule,
    RejectionReasonRoutingModule,
    SharedModule
  ]
})
export class RejectionReasonModule { }
