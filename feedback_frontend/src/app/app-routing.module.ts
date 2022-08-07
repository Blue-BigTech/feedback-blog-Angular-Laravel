import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';

const routes: Routes = [
  {
    path: 'home', component: VisitorLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./public/home/home.module').then(m => m.HomeModule) }]
  },
  {
    path: 'about-us',  component: VisitorLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./public/about-us/about-us.module').then(m => m.AboutUsModule)
    }]
  },
  {
    path: 'contact-us',  component: VisitorLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./public/contact-us/contact-us.module').then(m => m.ContactUsModule)
    }]
  },

  // Authentication routes
  {
    path: 'signup', component: AuthenticationLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./public/auth/signup/signup.module').then(m => m.SignupModule) }]
  },
  {
    path: 'login', component: AuthenticationLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./public/auth/login/login.module').then(m => m.LoginModule) }]
  },
  {
    path: 'reset-password-request', component: AuthenticationLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./public/auth/reset-request/reset-request.module').then(m => m.ResetRequestModule) }]
  },
  {
    path: 'reset-password-response', component: AuthenticationLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./public/auth/reset-response/reset-response.module').then(m => m.ResetResponseModule) }]
  },
  {
    path: 'verification-request', component: AuthenticationLayoutComponent,
    children: [{ path: '', loadChildren: () => import('./public/auth/register-success/register-success.module').then(m => m.RegisterSuccessModule) }]
  },
  {
    path: 'email-verified', component: AuthenticationLayoutComponent,
    children:[{ path: '', loadChildren: () => import('./public/auth/verif-email/verif-email.module').then(m => m.VerifEmailModule) }]
  },


  //User routes
  {
    path: 'us',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: 'news', loadChildren: () => import('./layouts/main-user-layout/left-sidebar/news/news.module').then(m => m.NewsModule) },
  { path: 'shop', loadChildren: () => import('./layouts/main-user-layout/left-sidebar/shop/shop.module').then(m => m.ShopModule) },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
