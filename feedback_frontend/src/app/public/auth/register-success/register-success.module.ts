import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterSuccessRoutingModule } from './register-success-routing.module';
import { RegisterSuccessComponent } from './register-success.component';


@NgModule({
  declarations: [
    RegisterSuccessComponent
  ],
  imports: [
    CommonModule,
    RegisterSuccessRoutingModule
  ]
})
export class RegisterSuccessModule { }
