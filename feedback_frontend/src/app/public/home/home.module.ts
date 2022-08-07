import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LoginModule } from '../auth/login/login.module';
import { SignupModule } from '../auth/signup/signup.module';
import { ResetRequestModule } from '../auth/reset-request/reset-request.module';
/*import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { ResetRequestComponent } from '../auth/reset-request/reset-request.component';*/


@NgModule({
  declarations: [
    HomeComponent,
    /*LoginComponent,
    SignupComponent,
    ResetRequestComponent*/
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    LoginModule,
    SignupModule,
    ResetRequestModule
  ]
})
export class HomeModule { }
