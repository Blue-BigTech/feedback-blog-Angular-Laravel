import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetRequestRoutingModule } from './reset-request-routing.module';
import { ResetRequestComponent } from './reset-request.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResetRequestComponent],
  imports: [CommonModule, ResetRequestRoutingModule, ReactiveFormsModule],
  exports: [ResetRequestComponent],
})
export class ResetRequestModule {}
