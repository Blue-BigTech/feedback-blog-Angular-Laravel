import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDataRoutingModule } from './my-data-routing.module';
import { MyDataComponent } from './my-data.component';


@NgModule({
  declarations: [
    MyDataComponent
  ],
  imports: [
    CommonModule,
    MyDataRoutingModule
  ]
})
export class MyDataModule { }
