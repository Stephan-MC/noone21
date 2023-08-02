import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RequestService } from './shared/services/request.service';
import { HttpClientModule } from '@angular/common/http';
import { Config } from './config/config';
import { LocalStorage } from './libs/localstorage';
import { Ng5BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FullContentHeaderComponent } from './shared/components/full-content-header/full-content-header.component';
import { GlobalService } from './shared/services/global.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { NgPopupsModule } from 'ng-popups';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AdminHeaderComponent } from './shared/components/admin-header/admin-header.component';
import { AdminNavbarComponent } from './shared/components/admin-navbar/admin-navbar.component';
// import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { LightboxModule } from 'ngx-lightbox';
import { EmbedVideo } from 'ngx-embed-video';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { LoaderService } from './shared/services/loader.service';
import { DateAgoPipe } from './shared/pipes/date-ago-pipe';
import { LandingPageComponent } from './pages/content-pages/landing-page/landing-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { CommonModule } from '@angular/common';
import { LySliderModule } from '@alyle/ui/slider';
import { LyIconModule } from '@alyle/ui/icon';
import { LyDialogModule } from '@alyle/ui/dialog';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

// import { CropperWithDialogComponent } from '../app/image-cropper/cropper-with-dialog.component';
import { CropperDialog } from '../app/vendors/image-cropper/cropper-dialog';

// Gestures
import {
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';

/** Import Alyle UI  */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig
} from '@alyle/ui';

/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';

/** Import themes */
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { NormalTemplateComponent } from './normal-template/normal-template.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SafeHtmlPipe } from './shared/pipes/safe-html-pipe';

export function gettoken() {
  return (localStorage.getItem((environment.localStoragePrefix + '_token')));
  // return localStorage.getItem(environment.localStoragePrefix + '_token');
};

const jwtConf: JwtModuleOptions = {
  config: {
    tokenGetter: gettoken,
    allowedDomains: environment.whitelistedDomains,
    skipWhenExpired: true
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    FullContentHeaderComponent,
    NotFoundComponent,
    AdminHeaderComponent,
    AdminNavbarComponent,
    DateAgoPipe,
    LandingPageComponent,
    CropperDialog,
    NormalTemplateComponent,
    BlogPageComponent,
    ChannelPageComponent,
    SafeHtmlPipe
   
  ],
  imports: [

    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientModule,
    EmbedVideo.forRoot(),
    Ng5BreadcrumbModule.forRoot(),
    NgxSummernoteModule, 
    // for HttpClient use:
   
    LoadingBarHttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // for Router use:
    LoadingBarRouterModule,
    LightboxModule,
    // for Core use:
    QuillModule.forRoot(),
    LoadingBarModule,
    JwtModule.forRoot(jwtConf),

    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyDialogModule,
    // Add components
    LyButtonModule,
    LyToolbarModule,
    LyImageCropperModule,
    // ...
    // Gestures
    HammerModule,
    ModalModule.forRoot(),
    CarouselModule,
    NgxGoogleAnalyticsModule.forRoot('G-6MJNE6QLFB'),

    ToastrModule.forRoot({
      positionClass: 'toast-top-center', 
      progressAnimation: 'decreasing',
       progressBar: true, 
      //  timeOut: 1000,
       preventDuplicates: true
    }), // ToastrModule added

    NgPopupsModule.forRoot({
      theme: 'material', // available themes: 'default' | 'material' | 'dark'
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      color: '#8030c3',
      titles: {
        alert: 'Danger!',
        confirm: 'Confirmation',
        prompt: 'Website asks...'
      }
    }),

    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      libraries: ['places'],
      // region: ''
    }),
    FormsModule, ReactiveFormsModule,
    // AgmJsMarkerClustererModule,
    SocialLoginModule,
  ],
 
  providers: [RequestService, Config, LocalStorage, GlobalService, AuthGuard,BsModalService,SafeHtmlPipe,
    LoaderService,
    [ LyTheme2 ],
    [ StyleRenderer ],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleId, { prompt: 'select_account' }
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookId
              //   , {
              //   status: true,
              //   xfbml: true,
              //   version: "v3,3",
              //   auth_type: 'reauthenticate'
              // }
            ),
          },
          // {
          //   id: AmazonLoginProvider.PROVIDER_ID,
          //   provider: new AmazonLoginProvider(
          //     'clientId'
          //   ),
          // },
          
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  exports:[
    SafeHtmlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
