import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillAddComponent } from './skill-add/skill-add.component';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { SkillListComponent } from './skill-list/skill-list.component';



const routes: Routes = [
  {
    path: '',
  //   children: [
  //     { path: '', redirectTo: 'list', pathMatch: 'full' },
  //     {
  //       path: 'add',
  //       component: SkillAddComponent
  //       ,
  //       data: {
  //         title: 'Skill Add',
  //         // permission: RoutesPermissions.default
  //       }
  //     },
  //     {
  //       path: 'edit/:id',
  //       component: SkillEditComponent,
  //       data: {
  //         title: 'Skill Edit',
  //         // permission: RoutesPermissions.default
  //       }
  //     },
  //     {
  //       path: 'list',
  //       component: SkillListComponent,
  //       data: {
  //         title: 'Skill List',
  //         // permission: RoutesPermissions.default
  //       }
  //     }

  //   ],
  //   // resolve: { route: AclResolverService, state: AclResolverService }
   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
