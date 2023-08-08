import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './add-page/add-page.component';
import { AddContentComponent } from './add-content/add-content.component';
import { PageFormComponent } from './page-form/page-form.component';
import { ContentFormComponent } from './content-form/content-form.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { PagesBuilderRoutingModule } from './pages-builder-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { ListPagesComponent } from './list-pages/list-pages.component';
import { SlugifyPipe } from 'src/app/shared/pipes/slugify.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbRatingModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  declarations: [AddPageComponent,AddContentComponent,SlugifyPipe, PageFormComponent, ContentFormComponent, EditPageComponent, EditContentComponent, ListPagesComponent],
  imports: [
    CommonModule,
    PagesBuilderRoutingModule,
    SharedModule,
    MatTabsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    ModalModule.forRoot(),
    NgbTypeaheadModule,
    NgbRatingModule,
    NgxSummernoteModule
  ],
  exports:[
    SlugifyPipe
  ],
  providers:    [ SlugifyPipe ]
})
export class PagesBuilderModule { }
