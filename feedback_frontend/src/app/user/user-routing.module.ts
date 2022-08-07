import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackWindowComponent } from '../layouts/main-user-layout/feedback-window/feedback-window.component';
import { MainUserLayoutComponent } from '../layouts/main-user-layout/main-user-layout.component';
import { CommentComponent } from '../layouts/main-user-layout/top-navbar/feedback-popup/comment/comment.component';
// import { FeedbackPopupComponent } from '../layouts/main-user-layout/top-navbar/feedback-popup/feedback-popup.component';
import { UserLayoutComponent } from '../layouts/user-layout/user-layout.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  /*{ path: '', loadChildren: () => import('./user.module').then(m => m.UserModule) },*/
  {
    path: '',
    component: MainUserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: 'profile-settings',
    component: MainUserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
    ],
  },
  {
    path: 'profile',
    component: MainUserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      // {
      //   path: 'feedback',
      //   component: FeedbackWindowComponent,
      //   children: [{ path: 'comment/:id', component: CommentComponent }],
      // },
    ],
  },

  {
    path: 'shop',
    component: MainUserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./shop/shop.module').then((m) => m.ShopModule),
      },
    ],
  },
  {
    path: 'overview',
    component: MainUserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./overview/overview.module').then((m) => m.OverviewModule),
      },
    ],
  },
  /*{
    path: 'reports/:id', component: MainUserLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) }]
  },
  {
    path: 'charts/:id', component: MainUserLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) }]
  },
  {
    path: 'sheets/:id', component: MainUserLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./sheets/sheets.module').then(m => m.SheetsModule) }]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
