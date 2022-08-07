import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ButtonModule} from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TooltipModule} from 'primeng/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'primeng/toast';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfirmPopupModule,
    ButtonModule,
    DialogModule,
    CardModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    TooltipModule,
    NgbModule,
    ToastModule,
    PasswordModule,
  ],
  exports: [
    ConfirmPopupModule,
    ButtonModule,
    DialogModule,
    CardModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    TooltipModule,
    NgbModule,
    ToastModule,
    PasswordModule,
  ],
  providers: [ConfirmationService]
})
export class SharedModule { }
