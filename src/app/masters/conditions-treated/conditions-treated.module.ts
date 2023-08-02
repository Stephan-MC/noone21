import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionsTreatedRoutingModule } from './conditions-treated-routing.module';
import { ConditionsTreatedAddComponent } from './conditions-treated-add/conditions-treated-add.component';
import { ConditionsTreatedEditComponent } from './conditions-treated-edit/conditions-treated-edit.component';
import { ConditionsTreatedFormComponent } from './conditions-treated-form/conditions-treated-form.component';
import { ConditionsTreatedListComponent } from './conditions-treated-list/conditions-treated-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ConditionsTreatedAddComponent, ConditionsTreatedEditComponent, ConditionsTreatedFormComponent, ConditionsTreatedListComponent],
  imports: [
    CommonModule,
    ConditionsTreatedRoutingModule,
    SharedModule
  ]
})
export class ConditionsTreatedModule { }
