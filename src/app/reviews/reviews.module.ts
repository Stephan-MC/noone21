import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { SharedModule } from '../shared/shared.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ReviewsListComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    SharedModule,
    NgbRatingModule
  ]
})
export class ReviewsModule { }
