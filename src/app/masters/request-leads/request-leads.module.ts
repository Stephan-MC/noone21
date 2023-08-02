import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestleadsListComponent } from './requestleads-list/requestleads-list.component';
import { RequestLeadsRoutingModule } from './request-leads-routing.module';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from 'src/app/masters/request-leads/edit/edit.component';

@NgModule({
  declarations: [RequestleadsListComponent,EditComponent],
  imports: [
    CommonModule,
    RequestLeadsRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    NgbModule
  ]
})
export class RequestLeadsModule { }
