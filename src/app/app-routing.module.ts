import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FULL_ROUTES } from './shared/routes/full-layout.routs';
import { AuthGuard } from './shared/services/auth-guard.service';
import { CLASSIFIED_ROUTS } from './shared/routes/classified-routs';

const appRoutes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },

  // {
  //   path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES,
  //   canActivate: [AuthGuard],
  // },

  { path: 'classified', component: FullLayoutComponent, data: { title: 'content Views' }, children: CLASSIFIED_ROUTS },

 

  {
    path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: FULL_ROUTES,
    // canActivate: [AuthGuard],
  },

  // { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/' },
  { path: '404', component: NotFoundComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
