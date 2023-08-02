
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { BuyerAppointmentComponent } from './buyer-appointment/buyer-appointment.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { BuyerProfileComponent } from './buyer-profile/buyer-profile.component';
import { BuyerSettingsComponent } from './buyer-settings/buyer-settings.component';
import { BuyerTipsComponent } from './buyer-tips/buyer-tips.component';
import { BuyerViewComponent } from './buyer-view/buyer-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersRoutingModule } from './buyers-routing.module';






@NgModule({
  declarations: [BuyerListComponent, BuyerProfileComponent, BuyerViewComponent, BuyerAppointmentComponent, BuyerTipsComponent, BuyerSettingsComponent],
  imports: [
    CommonModule,
    BuyersRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    NgSelectModule
  ]
})
export class BuyerModule { }
