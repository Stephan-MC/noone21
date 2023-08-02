import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifiedPostListComponent } from './classified-post-list/classified-post-list.component';
import { ClassifiedPostDetailsComponent } from './classified-post-details/classified-post-details.component';
import { ClassifiedRoutingModule } from './classified-routing.module';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { environment } from 'src/environments/environment';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ClassifiedPostListComponent, ClassifiedPostDetailsComponent],
  imports: [
    CommonModule,
    ClassifiedRoutingModule,
    SlickCarouselModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      libraries: ['places'],
    })
  ]
})
export class ClassifiedModule { }
