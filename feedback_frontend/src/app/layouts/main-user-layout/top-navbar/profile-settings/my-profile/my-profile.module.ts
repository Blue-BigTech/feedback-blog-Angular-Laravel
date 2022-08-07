import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CodeInputModule } from 'angular-code-input';
import { PublicProfileComponent } from './components/public-profile.component';

@NgModule({
  declarations: [MyProfileComponent, PublicProfileComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false,
      code: '',
    }),
    SharedModule,
  ],
  exports: [MyProfileComponent, PublicProfileComponent],
})
export class MyProfileModule {}
