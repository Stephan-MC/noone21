import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorRoutingModule } from './vendor-routing.module';
import { EditProfileComponent } from '../vendors/edit-profile/edit-profile.component';
import { NgxMaskModule } from 'ngx-mask';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../shared/shared.module';
import {NgxScrollToFirstInvalidModule} from '@ismaestro/ngx-scroll-to-first-invalid';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbTypeaheadModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MessagesComponent } from '../vendors/messages/messages.component';
import { AppointmentsComponent } from '../vendors/appointments/appointments.component';
import { VendorFavoritesComponent } from '../vendors/vendor-favorites/vendor-favorites.component';
import { VendorTipsComponent } from '../vendors/vendor-tips/vendor-tips.component';
import { VendorReviewsComponent } from '../vendors/vendor-reviews/vendor-reviews.component';
import { BasicProfileComponent } from '../vendors/basic-profile/basic-profile.component';
import { OtherSettingComponent } from '../vendors/other-setting/other-setting.component';
import { VendorCategoriesComponent } from '../vendors/vendor-categories/vendor-categories.component';
import { VendorConsultationComponent } from '../vendors/vendor-consultation/vendor-consultation.component';
import { VendorServicesComponent } from '../vendors/vendor-services/vendor-services.component';
import { VendorConditionTreatedComponent } from '../vendors/vendor-condition-treated/vendor-condition-treated.component';
import { VendorEditComponentComponent } from '../vendors/vendor-edit-component/vendor-edit-component.component';
import { VendorEducationComponent } from '../vendors/vendor-education/vendor-education.component';
import { VendorFaqComponent } from '../vendors/vendor-faq/vendor-faq.component';
import { GigsComponent } from '../vendors/gigs/gigs.component';
import { CreateGigsComponent } from '../vendors/create-gigs/create-gigs.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { VideoGalaryComponent } from './video-galary/video-galary.component';
import { ImageGalaryComponent } from './image-galary/image-galary.component';
import { ResetPasswordComponent } from 'src/app/vendors/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ClassifiedAddComponent } from './classified/classified-add/classified-add.component';
import { ClassifiedEditComponent } from './classified/classified-edit/classified-edit.component';
import { ClassifiedListviewComponent } from './classified/classified-listview/classified-listview.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { VendorAdvSettingComponent } from './vendor-adv-setting/vendor-adv-setting.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { ProfileReviewApprovalComponent } from './profile-review-approval/profile-review-approval.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BasicsProfileReviewComponent } from './basics-profile-review/basics-profile-review.component';
// import { RecaptchaModule } from "ng-recaptcha";

@NgModule({

  declarations: [VendorCategoriesComponent,
  EditProfileComponent, MessagesComponent,ResetPasswordComponent,
    AppointmentsComponent, VendorFavoritesComponent, VendorTipsComponent, 
    VendorReviewsComponent, BasicProfileComponent, VendorCategoriesComponent,OtherSettingComponent,
     VendorConsultationComponent, VendorServicesComponent, VendorConditionTreatedComponent, 
     VendorEditComponentComponent, 
    VendorEducationComponent, VendorFaqComponent, 
    GigsComponent, CreateGigsComponent, VendorListComponent, VendorProfileComponent, 
    VideoGalaryComponent, ImageGalaryComponent, ClassifiedAddComponent, ClassifiedEditComponent, ClassifiedListviewComponent, VendorAdvSettingComponent, UserMessagesComponent, ProfileReviewApprovalComponent, BasicsProfileReviewComponent

  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    NgxMaskModule.forRoot(),
    TabsModule.forRoot(),
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    PaginationModule.forRoot(),
    NgbTypeaheadModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule, NgbRatingModule,
    MatFormFieldModule,
    MatIconModule,
    NgxScrollToFirstInvalidModule,
    // RecaptchaModule,
    
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold'],   
          [{ 'list': 'bullet' }],  
        ]
      }
    }),
    ImageCropperModule,
    NgbTooltipModule,
    MatTabsModule
  ],
})

export class VendorsModule { }
