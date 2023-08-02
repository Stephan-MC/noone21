import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillAddComponent } from './skill-add/skill-add.component';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [SkillListComponent, SkillAddComponent, SkillEditComponent, SkillFormComponent],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    SharedModule,
    NgbTypeaheadModule
  ]
})
export class SkillsModule { }
