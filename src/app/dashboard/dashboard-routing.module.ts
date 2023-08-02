import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';


const routes: Routes = [

  {
    path: '',
    component: MainDashboardComponent,
    children: [
      {
        path: '', redirectTo: 'buyer',
        data: {
          title: 'Case List',
        },
        pathMatch: 'full'
      },
      {
        path: 'vendor',
        loadChildren: () => import('./vendor-dashboard/vendor-dashboard.module').then(m => m.VendorDashboardModule),
        data: {
          title: 'Vendor Dashboard',
          preload: true, delay: false
        }
        // permission:RoutesPermissions.getadjuster

      },

      {
        path: 'buyer',
        loadChildren: () => import('./buyer-dashboard/buyer-dashboard.module').then(m => m.BuyerDashboardModule),
        data: {
          title: 'Buyer Dashboard',
          preload: true, delay: false
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
        data: {
          title: 'Admin Dashboard',
          preload: true, delay: false
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
