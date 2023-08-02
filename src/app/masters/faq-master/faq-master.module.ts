import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqMasterRoutingModule } from './faq-master-routing.module';
import { FaqMasterAddComponent } from './faq-master-add/faq-master-add.component';
import { FaqMasterEditComponent } from './faq-master-edit/faq-master-edit.component';
import { FaqMasterFormComponent } from './faq-master-form/faq-master-form.component';
import { FaqMasterListComponent } from './faq-master-list/faq-master-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FaqMasterAddComponent, FaqMasterEditComponent, FaqMasterFormComponent, FaqMasterListComponent],
  imports: [
    CommonModule,
    FaqMasterRoutingModule,
    SharedModule
  ]
})
export class FaqMasterModule { }
