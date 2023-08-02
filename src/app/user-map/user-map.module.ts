import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMapRoutingModule } from './user-map-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { UserMapListComponent } from './user-map-list/user-map-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
@NgModule({
  declarations: [UserMapListComponent],
  imports: [
    CommonModule,
    UserMapRoutingModule,
    SharedModule,
    AgmCoreModule,
    PaginationModule.forRoot(),
    NgSelectModule,
    AgmJsMarkerClustererModule,
  ],
  exports: [UserMapListComponent]
})
export class UserMapModule { }
