import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';

import { apiProviders } from './app.api-providers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { PublicHomeComponent } from './pages/public-home/public-home.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { FormHistoryComponent } from './pages/main-layout/pages/form-history/form-history.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MyDetailsComponent } from './pages/main-layout/pages/my-details/my-details.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TimeAgoPipe } from 'src/lib/pipes/time-ago.pipe';
import { LoginFormComponent } from './pages/login/components/login-form/login-form.component';
import { OneTimeComponent } from './pages/login/components/one-time/one-time.component';
import { NumberSelectComponent } from './pages/login/components/number-select/number-select.component';
import { HomeComponent } from './pages/main-layout/pages/home/home.component';
import { ChristieLogoComponent } from './components/christie-logo/christie-logo.component';
import { LoginErrorComponent } from './pages/login/components/login-error/login-error.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { NhsNumberComponent } from './pages/login/components/nhs-number/nhs-number.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { TokenRedirectComponent } from './pages/token-redirect/token-redirect.component';
import { Logger } from 'src/lib/services/logging/logger';
import { ConsoleLogger } from 'src/lib/services/logging/logger.console';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
import { FormRequestComponent } from './pages/main-layout/pages/form-request/form-request.component';
import { FormRequestDeclineComponent } from './pages/main-layout/pages/form-request/components/form-request-decline/form-request-decline.component';
import { FormRequestFeedbackComponent } from './pages/main-layout/pages/form-request/components/form-request-feedback/form-request-feedback.component';
import { FormRequestErrorComponent } from './pages/main-layout/pages/form-request/components/form-request-error/form-request-error.component';
import { FormRequestExpiredComponent } from './pages/main-layout/pages/form-request/components/form-request-expired/form-request-expired.component';
import { FormRequestOptionsComponent } from './pages/main-layout/pages/form-request/components/form-request-options/form-request-options.component';
import { FormRequestEditComponent } from './pages/main-layout/pages/form-request/components/form-request-edit/form-request-edit.component';
import { LoginProblemsComponent } from './pages/login-problems/login-problems.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from 'src/lib/store/reducers';
import { AppEffects } from 'src/lib/store/effects';
import { FormNewComponent } from './pages/main-layout/pages/form-new/form-new.component';
import { FormViewComponent } from './pages/main-layout/pages/form-view/form-view.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HelpComponent } from './pages/main-layout/pages/help/help.component';
import { ApiLogger } from 'src/lib/services/logging/logger.ship';
import { PendingFormComponent } from './pages/main-layout/pages/form-history/pending-form/pending-form.component';
import { CompletedFormComponent } from './pages/main-layout/pages/form-history/completed-form/completed-form.component';
import { DeclinedFormComponent } from './pages/main-layout/pages/form-history/declined-form/declined-form.component';
import { ExpiredFormComponent } from './pages/main-layout/pages/form-history/expired-form/expired-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicHomeComponent,
    MainLayoutComponent,
    FormHistoryComponent,
    LoadingOverlayComponent,
    MyDetailsComponent,
    PageHeaderComponent,
    TimeAgoPipe,
    LoginFormComponent,
    OneTimeComponent,
    NumberSelectComponent,
    HomeComponent,
    ChristieLogoComponent,
    LoginErrorComponent,
    LogoutComponent,
    ErrorModalComponent,
    NhsNumberComponent,
    ConfirmModalComponent,
    TokenRedirectComponent,
    WarningModalComponent,
    FormRequestComponent,
    FormRequestDeclineComponent,
    FormRequestFeedbackComponent,
    FormRequestErrorComponent,
    FormRequestExpiredComponent,
    FormRequestOptionsComponent,
    FormRequestEditComponent,
    LoginProblemsComponent,
    FormNewComponent,
    FormViewComponent,
    NotFoundComponent,
    HelpComponent,
    PendingFormComponent,
    CompletedFormComponent,
    DeclinedFormComponent,
    ExpiredFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [
    ...apiProviders(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: Logger,
      useClass: environment.production
        ? ApiLogger
        : ConsoleLogger
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
