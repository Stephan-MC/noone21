import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from 'src/app/users/user-list/user-list.component';
import { AdminDashboardMainComponent } from './admin-dashboard-main/admin-dashboard-main.component';
import { ReviewsListComponent } from 'src/app/reviews/reviews-list/reviews-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserMapListComponent } from 'src/app/user-map/user-map-list/user-map-list.component';
import { ConsultationListComponent } from 'src/app/masters/consultation/consultation-list/consultation-list.component';
import { CategoryAddComponent } from 'src/app/masters/category/category-add/category-add.component';
import { CategoryEditComponent } from 'src/app/masters/category/category-edit/category-edit.component';
import { ConsultationAddComponent } from 'src/app/masters/consultation/consultation-add/consultation-add.component';
import { ConsultationEditComponent } from 'src/app/masters/consultation/consultation-edit/consultation-edit.component';
import { SkillEditComponent } from 'src/app/masters/skills/skill-edit/skill-edit.component';
import { SkillAddComponent } from 'src/app/masters/skills/skill-add/skill-add.component';
import { SkillListComponent } from 'src/app/masters/skills/skill-list/skill-list.component';
import { RejectionReasonListComponent } from 'src/app/masters/rejection-reason/rejection-reason-list/rejection-reason-list.component';
import { RejectionReasonAddComponent } from 'src/app/masters/rejection-reason/rejection-reason-add/rejection-reason-add.component';
import { RejectionReasonEditComponent } from 'src/app/masters/rejection-reason/rejection-reason-edit/rejection-reason-edit.component';
import { FaqMasterListComponent } from 'src/app/masters/faq-master/faq-master-list/faq-master-list.component';
import { FaqMasterAddComponent } from 'src/app/masters/faq-master/faq-master-add/faq-master-add.component';
import { FaqMasterEditComponent } from 'src/app/masters/faq-master/faq-master-edit/faq-master-edit.component';
import { ConditionsTreatedListComponent } from 'src/app/masters/conditions-treated/conditions-treated-list/conditions-treated-list.component';
import { ConditionsTreatedAddComponent } from 'src/app/masters/conditions-treated/conditions-treated-add/conditions-treated-add.component';
import { ConditionsTreatedEditComponent } from 'src/app/masters/conditions-treated/conditions-treated-edit/conditions-treated-edit.component';

import { ServicesMasterListComponent } from 'src/app/masters/services-master/services-master-list/services-master-list.component';
import { ServicesMasterAddComponent } from 'src/app/masters/services-master/services-master-add/services-master-add.component';
import { ServicesMasterEditComponent } from 'src/app/masters/services-master/services-master-edit/services-master-edit.component';
import { RequestleadsListComponent } from 'src/app/masters/request-leads/requestleads-list/requestleads-list.component';
import { CategoryListComponent } from 'src/app/masters/category/category-list/category-list.component';
import { ProfileReviewApprovalComponent } from 'src/app/vendors/profile-review-approval/profile-review-approval.component';
import { AddPageComponent } from './pages-builder/add-page/add-page.component';
import { EditPageComponent } from './pages-builder/edit-page/edit-page.component';
import { AddContentComponent } from './pages-builder/add-content/add-content.component';
import { EditContentComponent } from './pages-builder/edit-content/edit-content.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AdminDashboardMainComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'users-list',
        component: UserListComponent,
      },
      {
        path: 'user-map-list',
        component: UserMapListComponent,
       
      },
      {
        path: 'reviews-list',
        component: ReviewsListComponent,
       
      },
      {
        path: 'consultation-list',
        component: ConsultationListComponent,
       
      },
      {
        path: 'consultation-add',
        component: ConsultationAddComponent
        ,
        data: {
          title: 'Consultation Add',
          // permission: RoutesPermissions.default
        }
      },
      {
        path: 'consultation-edit/:id',
        component: ConsultationEditComponent,
        data: {
          title: 'Consultation Edit',
          // permission: RoutesPermissions.default
        }
      },
      {
        path: 'category-list',
        component: CategoryListComponent,
       
      },
      {
        path: 'category-add',
        component: CategoryAddComponent ,
        data: {
          title: 'Category Add',
          // permission: RoutesPermissions.default
        }
      },
      {
        path: 'category-edit/:id',
        component: CategoryEditComponent,
        data: {
          title: 'Category Edit',
          // permission: RoutesPermissions.default
        }
      },
      {
        path: 'sub-category-list',
        component: SkillListComponent,
       
      },
      {
        path: 'sub-category-add',
        component: SkillAddComponent,
       
      },
      {
        path: 'sub-category-edit/:id',
        component: SkillEditComponent,
       
      },
      {
        path: 'rejectionReason-list',
        component: RejectionReasonListComponent,
       
      },
      {
        path: 'rejectionReason-add',
        component: RejectionReasonAddComponent,
       
      },
      {
        path: 'rejectionReason-edit/:id',
        component: RejectionReasonEditComponent,
       
      },
      {
        path: 'faq-list',
        component: FaqMasterListComponent,
       
      },
      {
        path: 'faq-add',
        component: FaqMasterAddComponent,
       
      },
      {
        path: 'faq-edit/:id',
        component: FaqMasterEditComponent,
       
      },
      {
        path: 'conditionsTreated-list',
        component: ConditionsTreatedListComponent,
       
      },
      {
        path: 'conditionsTreated-add',
        component: ConditionsTreatedAddComponent,
       
      },
      {
        path: 'conditionsTreated-edit/:id',
        component: ConditionsTreatedEditComponent,
       
      },
      {
        path: 'conditionsTreated-list',
        component: ConditionsTreatedListComponent,
       
      },
      {
        path: 'conditionsTreated-add',
        component: ConditionsTreatedAddComponent,
       
      },
      {
        path: 'conditionsTreated-edit/:id',
        component: ConditionsTreatedEditComponent,
       
      },
      {
        path: 'service-list',
        component: ServicesMasterListComponent,
       
      },
      {
        path: 'service-add',
        component: ServicesMasterAddComponent,
       
      },
      {
        path: 'service-edit/:id',
        component: ServicesMasterEditComponent,
       
      },
      {
        path: 'requestlead-list',
        component: RequestleadsListComponent,
       
      },
      {
        path: 'approval-reviews/:id',
        component: ProfileReviewApprovalComponent,
       
      },
      {
        path: 'page-builder',
        loadChildren: () => import('../admin-dashboard/pages-builder/pages-builder.module').then(m => m.PagesBuilderModule),
        data: {
          title: 'Page Builder',
          preload: true, delay: false
        }
      },
      // {
      //   path: 'add-page',
      //   component: AddPageComponent,
       
      // },
      // {
      //   path: 'edit-page',
      //   component: EditPageComponent,
       
      // },
      // {
      //   path: 'add-content',
      //   component: AddContentComponent,
       
      // },
      // {
      //   path: 'edit-content',
      //   component: EditContentComponent,
       
      // },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
