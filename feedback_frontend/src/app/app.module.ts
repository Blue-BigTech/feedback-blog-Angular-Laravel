import { ResizableModule } from 'angular-resizable-element';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './layouts/admin-header/admin-header.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminSidebarComponent } from './layouts/admin-sidebar/admin-sidebar.component';

import { SharedModule } from './shared/modules/shared.module';

import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { VisitorFooterComponent } from './layouts/visitor-footer/visitor-footer.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { AngularSplitModule } from 'angular-split';
import { MainUserLayoutComponent } from './layouts/main-user-layout/main-user-layout.component';
import { LeftSidebarComponent } from './layouts/main-user-layout/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './layouts/main-user-layout/right-sidebar/right-sidebar.component';
import { TopNavbarComponent } from './layouts/main-user-layout/top-navbar/top-navbar.component';

import { AngularResizeEventModule } from 'angular-resize-event';
import { UserModule } from './user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashModule } from './layouts/main-user-layout/pages/dash/dash.module';
import { ChartModule } from './layouts/main-user-layout/pages/chart/chart.module';
import { SheetModule } from './layouts/main-user-layout/pages/sheet/sheet.module';
import { ReportModule } from './layouts/main-user-layout/pages/report/report.module';
import { ProfileMenuService } from './shared/services/profile-menu.service';
import { MyProfileModule } from './layouts/main-user-layout/top-navbar/profile-settings/my-profile/my-profile.module';
import { ThemeSwitcherModule } from './layouts/main-user-layout/top-navbar/profile-settings/theme-switcher/theme-switcher.module';
import { LoginRegisterModalService } from './shared/services/login-register-modal.service';
import { ThemeSwitcherService } from './shared/services/theme-switcher.service';
import { PlansBillingsModule } from './layouts/main-user-layout/top-navbar/profile-settings/plans-billings/plans-billings.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlansBillingsService } from './shared/services/user-plans-and-billings/plans-billings.service';
import { SplittedAreaComponent } from './layouts/splitted-area/splitted-area.component';
import { BugsComponent } from './layouts/main-user-layout/top-navbar/feedback-popup/bugs/bugs.component';
import { FeatureComponent } from './layouts/main-user-layout/top-navbar/feedback-popup/feature/feature.component';
import { QuestionsComponent } from './layouts/main-user-layout/top-navbar/feedback-popup/questions/questions.component';
import { PopupsServiceService } from './shared/services/popups-service.service';
import { CommentComponent } from './layouts/main-user-layout/top-navbar/feedback-popup/comment/comment.component';
import { CreateFormComponent } from './layouts/main-user-layout/top-navbar/feedback-popup/createform/createform.component';
import { UpdateFormComponent } from './layouts/main-user-layout/top-navbar/feedback-popup/updateForm/updateform.component';
import { FeedbackWindowComponent } from './layouts/main-user-layout/feedback-window/feedback-window.component';
import { NewsModule } from './layouts/main-user-layout/left-sidebar/news/news.module';
import { ProfileWindowComponent } from './layouts/main-user-layout/profile-window/profile-window.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminSidebarComponent,
    VisitorLayoutComponent,
    VisitorFooterComponent,
    AuthenticationLayoutComponent,
    MainUserLayoutComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    TopNavbarComponent,
    SplittedAreaComponent,
    BugsComponent,
    FeatureComponent,
    QuestionsComponent,
    CommentComponent,
    CreateFormComponent,
    UpdateFormComponent,
    FeedbackWindowComponent,
    ProfileWindowComponent
  ],
  imports: [
    AngularSplitModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    DragDropModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      enableHtml: true,
      maxOpened: 1,
    }),
    AppRoutingModule,
    HttpClientModule,
    AngularResizeEventModule,
    UserModule,
    ResizableModule,
    ReactiveFormsModule,
    FormsModule,
    DashModule,
    ChartModule,
    SheetModule,
    ReportModule,
    MyProfileModule,
    ThemeSwitcherModule,
    PlansBillingsModule,
    NgbModule,
    NewsModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    ProfileMenuService,
    LoginRegisterModalService,
    ThemeSwitcherService,
    PlansBillingsService,
    PopupsServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
