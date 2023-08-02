import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgxMaskModule } from 'ngx-mask'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserMapModule } from 'src/app/user-map/user-map.module';
import { NgbTypeaheadModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { UserMapViewComponent } from './user-map-view/user-map-view.component';
import { FaqsComponent } from './faqs/faqs.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { HealthTipsComponent } from './health-tips/health-tips.component';
import { HealthTipsInnerComponent } from './health-tips-inner/health-tips-inner.component';
import { VendorsModule } from 'src/app/vendors/vendors.module';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { PersonalDataDeletionComponent } from './personal-data-deletion/personal-data-deletion.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { PakChannelComponent } from './pak-channel/pak-channel.component';
import { SuccessComponent } from './success/success.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { RecaptchaModule } from "ng-recaptcha";

import { ReplaceUnderscorePipe } from './all-categories/replace-underscore-pipe';
import { ReplacePipe } from './all-categories/replace-pipe';
import { WellComeComponent } from './well-come/well-come.component';
import { MediaCoverageComponent } from './media-coverage/media-coverage.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent,
    // LandingPageComponent,
    WelcomePageComponent, ContactUsComponent, HowItWorksComponent, 
    ConfirmationPageComponent, UserMapViewComponent, FaqsComponent,
     DisclaimerComponent, TermsAndConditionsComponent, AboutUsComponent, 
     AllCategoriesComponent, HealthTipsComponent, HealthTipsInnerComponent, 
     UserVerificationComponent, ResetPasswordComponent, ErrorpageComponent, 
     PersonalDataDeletionComponent, VideoPageComponent, PakChannelComponent, 
     SuccessComponent,PrivacyPolicyComponent, ThankYouComponent,ReplaceUnderscorePipe, ReplacePipe, WellComeComponent, MediaCoverageComponent],
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    VendorsModule,
    TabsModule.forRoot(),
    UserMapModule,
    NgbRatingModule,
    PaginationModule.forRoot(),
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    NgbTypeaheadModule,
    RecaptchaModule,
   
    
  ]
})
export class ContentPagesModule { }
