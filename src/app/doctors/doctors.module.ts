import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxMaskModule } from 'ngx-mask';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbTypeaheadModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MessagesComponent } from './messages/messages.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorFavoritesComponent } from './doctor-favorites/doctor-favorites.component';
import { DoctorTipsComponent } from './doctor-tips/doctor-tips.component';
import { DoctorReviewsComponent } from './doctor-reviews/doctor-reviews.component';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { DoctorCategoriesComponent } from './doctor-categories/doctor-categories.component';
import { DoctorConsultationComponent } from './doctor-consultation/doctor-consultation.component';
import { DoctorServicesComponent } from './doctor-services/doctor-services.component';
import { DoctorConditionTreatedComponent } from './doctor-condition-treated/doctor-condition-treated.component';
import { DoctorEditComponentComponent } from './doctor-edit-component/doctor-edit-component.component';
import { DoctorEducationComponent } from './doctor-education/doctor-education.component';
import { DoctorFaqComponent } from './doctor-faq/doctor-faq.component';
import { GigsComponent } from './gigs/gigs.component';
import { CreateGigsComponent } from './create-gigs/create-gigs.component';
@NgModule({
  declarations: [
    EditProfileComponent, MessagesComponent,
    AppointmentsComponent, DoctorFavoritesComponent, DoctorTipsComponent, DoctorReviewsComponent, BasicProfileComponent, 
    DoctorCategoriesComponent, DoctorConsultationComponent, DoctorServicesComponent, DoctorConditionTreatedComponent, DoctorEditComponentComponent, DoctorEducationComponent, DoctorFaqComponent, GigsComponent, CreateGigsComponent],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    NgxMaskModule.forRoot(),
    TabsModule.forRoot(),
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    PaginationModule.forRoot(),
    NgbTypeaheadModule,
    MatAutocompleteModule,
    MatChipsModule, NgbRatingModule,
    NgbTooltipModule
  ]
})
export class DoctorsModule { }
