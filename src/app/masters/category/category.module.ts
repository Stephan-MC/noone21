import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CategoryListComponent, CategoryEditComponent, CategoryAddComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
