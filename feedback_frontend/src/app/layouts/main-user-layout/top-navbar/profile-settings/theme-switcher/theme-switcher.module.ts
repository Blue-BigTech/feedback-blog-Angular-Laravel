import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeSwitcherRoutingModule } from './theme-switcher-routing.module';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ThemeSwitcherComponent
  ],
  imports: [
    CommonModule,
    ThemeSwitcherRoutingModule,
    FormsModule
  ],
  exports: [
    ThemeSwitcherComponent
  ]
})
export class ThemeSwitcherModule { }
