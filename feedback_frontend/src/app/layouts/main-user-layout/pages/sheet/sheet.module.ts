import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetRoutingModule } from './sheet-routing.module';
import { SheetComponent } from './sheet.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    SheetComponent
  ],
  imports: [
    CommonModule,
    SheetRoutingModule,
    SharedModule
  ],
  exports: [
    SheetComponent
  ]
})
export class SheetModule { }
