import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifEmailRoutingModule } from './verif-email-routing.module';
import { VerifEmailComponent } from './verif-email.component';


@NgModule({
  declarations: [
    VerifEmailComponent
  ],
  imports: [
    CommonModule,
    VerifEmailRoutingModule
  ]
})
export class VerifEmailModule { }
