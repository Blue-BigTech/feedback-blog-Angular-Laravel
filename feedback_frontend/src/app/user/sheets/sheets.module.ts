import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetsRoutingModule } from './sheets-routing.module';
import { SheetsComponent } from './sheets.component';


@NgModule({
  declarations: [
    SheetsComponent
  ],
  imports: [
    CommonModule,
    SheetsRoutingModule
  ]
})
export class SheetsModule { }
