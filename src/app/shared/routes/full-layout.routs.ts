import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { LandingPageComponent } from 'src/app/pages/content-pages/landing-page/landing-page.component';
import { PakChannelComponent } from 'src/app/pages/content-pages/pak-channel/pak-channel.component';
import { NormalTemplateComponent } from 'src/app/normal-template/normal-template.component';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { BlogPageComponent } from 'src/app/blog-page/blog-page.component';
import { ChannelPageComponent } from 'src/app/channel-page/channel-page.component';
import { ChannelPageDetailsComponent } from 'src/app/channel-page-details/channel-page-details.component';
// import {ContentPagesModule} from '@appDir/pages/content-pages/content-pages.module';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const FULL_ROUTES: Routes = [
    {
       path: '',
        // redirectTo: 'pages',
        component: LandingPageComponent,
        pathMatch: 'full'
    },
    {  path: '404',
      component:PageNotFoundComponent
    },
        {  path: 'pak-channel',
        component:PageNotFoundComponent
    },

     {  path: ':slug',
        component:NormalTemplateComponent
    },
   
    { path: 'channel/:slug',
    component: ChannelPageComponent
    },
    {  path: 'channel/:slug/:slug',
    component: ChannelPageDetailsComponent
    },
    {  path: 'blog/:slug',
    component: BlogPageComponent
    },
    {
        path: 'pages', loadChildren: () => import('../../pages/content-pages/content-pages.module').then(m => m.ContentPagesModule),
    },

    {
        path: 'users', loadChildren: () => import('../../users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'vendors', loadChildren: () => import('../../vendors/vendors.module').then(m => m.VendorsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard', loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
    },
 
    {
        path: 'buyer', loadChildren: () => import('../../buyer/buyer.module').then(m => m.BuyerModule),
        canActivate: [AuthGuard],
    }
    ,
    {
        path: 'category', loadChildren: () => import('../../masters/category/category.module').then(m => m.CategoryModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'request-lead', loadChildren: () => import('../../masters/request-leads/request-leads.module').then(m => m.RequestLeadsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'sub-category', loadChildren: () => import('../../masters/skills/skills.module').then(m => m.SkillsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'rejection-reason', loadChildren: () => import('../../masters/rejection-reason/rejection-reason.module').then(m => m.RejectionReasonModule),
        canActivate: [AuthGuard],
    },

    {
        path: 'consultation', loadChildren: () => import('../../masters/consultation/consultation.module').then(m => m.ConsultationModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'faq', loadChildren: () => import('../../masters/faq-master/faq-master.module').then(m => m.FaqMasterModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'condition-treated', loadChildren: () => import('../../masters/conditions-treated/conditions-treated.module').then(m => m.ConditionsTreatedModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'service', loadChildren: () => import('../../masters/services-master/services-master.module').then(m => m.ServicesMasterModule),
        canActivate: [AuthGuard],
    },

    //this path is used for reviews against doctors on which admin can approve any review
    {
        // path: 'pages',
        path: 'reviews', loadChildren: () => import('../../reviews/reviews.module').then(m => m.ReviewsModule),
        canActivate: [AuthGuard],
        // loadChildren: '@appDir/pages/content-pages/content-pages.module#ContentPagesModule'
    },
    //this method is used for user list on map
    {
        // path: 'pages',
        path: 'user-map', loadChildren: () => import('../../user-map/user-map.module').then(m => m.UserMapModule),
        canActivate: [AuthGuard],
    }

];
