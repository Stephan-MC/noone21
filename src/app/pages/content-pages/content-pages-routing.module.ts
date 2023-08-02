import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginType } from 'src/app/shared/Enums/Login-type.enum';
import { LoginGuardService } from 'src/app/shared/services/login-guard.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { UserMapViewComponent } from './user-map-view/user-map-view.component';
import { FaqsComponent } from './faqs/faqs.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { HealthTipsComponent } from './health-tips/health-tips.component';
import { HealthTipsInnerComponent } from './health-tips-inner/health-tips-inner.component';
import { VendorListComponent } from 'src/app/vendors/vendor-list/vendor-list.component';
import { VendorProfileComponent } from 'src/app/vendors/vendor-profile/vendor-profile.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { PersonalDataDeletionComponent } from './personal-data-deletion/personal-data-deletion.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { PakChannelComponent } from './pak-channel/pak-channel.component';
import { SuccessComponent } from './success/success.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { WellComeComponent } from './well-come/well-come.component';
import { MediaCoverageComponent } from './media-coverage/media-coverage.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      {
        path: 'vendor-login',
        component: LoginComponent,
        data: {
          title: 'Vendor Login',
          permission: "loginDefault",
          type: LoginType.vendor

        },
        canActivate: [LoginGuardService],
      },
      {
        path: 'buyer-login',
        component: LoginComponent,
        data: {
          title: 'Buyer Login',
          permission: "loginDefault",
          type: LoginType.buyer

        },
        canActivate: [LoginGuardService],
      },
      {
        path: 'admin-login',
        component: LoginComponent,
        data: {
          title: 'Admin Login',
          permission: "loginDefault",
          type: LoginType.admin

        },
        canActivate: [LoginGuardService],
      },
   
      {
        path: 'vendor-list',
        component: VendorListComponent,
        data: {
          title: 'Vendor List',
          permission: "loginDefault"

        },
        // canActivate: [LoginGuardService],
      },
     
      {
        path: 'vendor-list/:category',
        component: VendorListComponent,
        data: {
          title: 'Vendor List',
          permission: "loginDefault"

        },
        // canActivate: [LoginGuardService],
      },
      
      {
        path: 'vendor-list/:category/:subCategory',
        component: VendorListComponent,
        data: {
          title: 'Vendor List',
          permission: "loginDefault"

        },
        // canActivate: [LoginGuardService],
      },
     
      {
        path: 'vendor/:id',
        component: VendorProfileComponent,
        data: {
          title: 'Vendor Profile',
          permission: "loginDefault"

        },
      },
      {
        path: 'landing',
        component: LandingPageComponent,
        data: {
          title: 'Landing',
          permission: "loginDefault",
          isShowBreadCrumb: false
        }
      },
      {
        path: 'user-verify/:token',
        component: UserVerificationComponent,
        data: {
          title: 'User-Verification',
          permission: "loginDefault",
          isShowBreadCrumb: false
        }
      },
      {
        path: 'signup-success',
        component: WellComeComponent,
        data: {
          title: 'signup success',
          permission: "loginDefault",
          isShowBreadCrumb: false
        }
      },
      {
        path: 'password-reset/:token',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset-Password',
          permission: "loginDefault",
          isShowBreadCrumb: false
        }
      },
      {
        path: 'welcome',
        component: WelcomePageComponent,
        data: {
          title: 'Welcome',
          permission: "loginDefault",
          isShowBreadCrumb: false
        }
      },
      {
        path: 'vendor-register',
        component: RegisterComponent,
        data: {
          title: 'Sign Up',
          permission: "loginDefault",
          type: LoginType.vendor
        },
        canActivate: [LoginGuardService],
      },

      {
        path: 'buyer-register',
        component: RegisterComponent,
        data: {
          title: 'Sign Up',
          permission: "loginDefault",
          type: LoginType.buyer
        },
        canActivate: [LoginGuardService],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forgot-password',
          permission: "loginDefault"

        },
        canActivate: [LoginGuardService],
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          title: 'Contact Us',
          permission: "loginDefault"

        }
      },
      {
        path: 'how-it-works',
        component: HowItWorksComponent,
        data: {
          title: 'How it Works',
          permission: "loginDefault"

        }
      },
      {
        path: 'thank-you',
        component: ThankYouComponent,
        data: {
          title: 'Thank You Page',
          permission: "loginDefault"

        }
      }, {
        path: 'pak-channel',
        component: PakChannelComponent,
        data: {
          title: 'Pak Channel',
          permission: "loginDefault"

        }
      },
      {
        path: 'whats-on',
        component: VideoPageComponent,
        data: {
          title: 'Whats On',
          permission: "loginDefault"

        }
      },
      {
        path: 'faqs',
        component: FaqsComponent,
        data: {
          title: 'Faqs',
          permission: "loginDefault"

        }
      }, {
        path: 'disclaimer',
        component: DisclaimerComponent,
        data: {
          title: 'Disclaimer',
          permission: "loginDefault"

        }
      }, {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
        data: {
          title: 'Terms and Conditions',
          permission: "loginDefault"

        }
      }, {
        path: 'privacy-policy',
        component:PrivacyPolicyComponent,
        data: {
          title: 'Privacy Policy',
          permission: "loginDefault"

        }
      }, {
        path: 'error-page',
        component:ErrorpageComponent,
        data: {
          title: 'Error Page',
          permission: "loginDefault"

        }
      }, {
        path: 'personal-data-deletion',
        component:PersonalDataDeletionComponent,
        data: {
          title: 'Personal Data Deletion',
          permission: "loginDefault"

        }
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        data: {
          title: 'About us',
          permission: "loginDefault"

        }
      }, {
        path: 'all-categories',
        component: AllCategoriesComponent,
        data: {
          title: 'All Categories',
          permission: "loginDefault"

        }
      },
      {
        path: 'confirmation',
        component: ConfirmationPageComponent,
        data: {
          title: 'Confirmation page',
          permission: "loginDefault"

        }
      },
      {
        path: 'map-view',
        component: UserMapViewComponent,
        data: {
          title: 'Map View',
          permission: "loginDefault"

        }
      },
      {
        path: 'tips',
        component: HealthTipsComponent,
        data: {
          title: 'Industry Tips',
          permission: "loginDefault"

        }
      },
      {
        path: 'health-tips-inner',
        component: HealthTipsInnerComponent,
        data: {
          title: 'Health Tips Inner',
          permission: "loginDefault"

        }
      },
      {
        path: 'classified/success',
        component: SuccessComponent,
        data: {
          title: 'Success page page',
          permission: "loginDefault"

        }
      } ,  {
        path: 'media-coverages',
        component: MediaCoverageComponent,
        data: {
          title: 'Media Coverage Page',
          permission: "loginDefault"

        }
      }
    ],
    // resolve: { route: AclResolverService, state: AclResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentPagesRoutingModule { }
