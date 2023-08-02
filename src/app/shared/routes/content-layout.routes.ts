import { Routes, RouterModule } from '@angular/router';
// import {ContentPagesModule} from '@appDir/pages/content-pages/content-pages.module';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
    // {
    //     path: 'pages',
    //     loadChildren: './pages/content-pages/content-pages.module#ContentPagesModule'
    // }

    {
        // path: 'pages',
        path: 'pages', loadChildren: () => import('../../pages/content-pages/content-pages.module').then(m => m.ContentPagesModule),
        // loadChildren: '@appDir/pages/content-pages/content-pages.module#ContentPagesModule'
    }
];
