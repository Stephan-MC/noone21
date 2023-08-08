import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MaskDateDirective } from './directives/date-mask.directive';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MapModalComponent } from './components/modals/map-modal/map-modal.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { UTCTimePipe } from './pipes/utc-time.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxResizeWatcherDirective } from './directives/ngx-resize-watcher.directive';
import { DisableAutofillDirective } from './directives/disable-autofill.directive';
import { PhonePipe } from './pipes/phone.pipe';
import { RequestLeadComponent } from './components/request-lead/request-lead.component';
import { MessageComponent } from './components/message/message.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

// import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    // NavbarComponent, HeaderComponent, FooterComponent,
    MaskDateDirective,
    MapModalComponent,
    UTCTimePipe,
    NgxResizeWatcherDirective,
    DisableAutofillDirective,
    PhonePipe,
    RequestLeadComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    AgmCoreModule,
    // NgxCaptchaModule,
    NgxSpinnerModule,
    MatTabsModule
  ],
  exports: [
    FormsModule, ReactiveFormsModule, 
    // NgxCaptchaModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaskDateDirective,
    NgxDatatableModule,
    MapModalComponent,
    UTCTimePipe,
    NgxSpinnerModule,
    NgxResizeWatcherDirective,
    DisableAutofillDirective,
    PhonePipe,
    RequestLeadComponent,
    MessageComponent,
  ]
})
export class SharedModule { }
