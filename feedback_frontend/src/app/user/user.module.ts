import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from '../layouts/user-header/user-header.component';
import { UserLayoutComponent } from '../layouts/user-layout/user-layout.component';
import { UserSidebarComponent } from '../layouts/user-sidebar/user-sidebar.component';
import { AngularSplitModule } from "angular-split";
import { AngularResizeEventModule } from 'angular-resize-event';
import { ResizableModule } from 'angular-resizable-element';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    UserHeaderComponent,
    UserLayoutComponent,
    UserSidebarComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularSplitModule,
    ResizableModule,
    AngularResizeEventModule,
    FormsModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
