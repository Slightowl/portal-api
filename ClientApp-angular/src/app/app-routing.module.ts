import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { FormHistoryComponent } from './pages/main-layout/pages/form-history/form-history.component';
import { LoginComponent } from './pages/login/login.component';
import { MyDetailsComponent } from './pages/main-layout/pages/my-details/my-details.component';
import { PublicHomeComponent } from './pages/public-home/public-home.component';
import { HomeComponent } from './pages/main-layout/pages/home/home.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TokenRedirectComponent } from './pages/token-redirect/token-redirect.component';
import { FormRequestComponent } from './pages/main-layout/pages/form-request/form-request.component';
import { LoginProblemsComponent } from './pages/login-problems/login-problems.component';
import { FormNewComponent } from './pages/main-layout/pages/form-new/form-new.component';
import { FormViewComponent } from './pages/main-layout/pages/form-view/form-view.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HelpComponent } from './pages/main-layout/pages/help/help.component';

const routes: Routes = [

  { path: 'public', component: PublicHomeComponent },

  /**
   * link shortening
   *
   * These routes follow a convention to allow link shortening for a specific
   * redirect after login. Each route should use the TokenRedirectComponent and
   * start with a single letter that will be mapped to specific page by the
   * login component.
   *
   * The TokenRedirectComponent simply turns the route in to
   * query params and redirects to login; ie:
   *
   *  - f/ABC123 => /login?token=ABC123&path=f
   * 
   * the login flow then uses the PATH_MAP (in the login component) to redirect
   * after a successful login, appending the token. So the example above would
   * be redirected to:
   *
   *  - /forms/request/ABC123
   */
  { path: 'f/:token', component: TokenRedirectComponent },

  /**
   * login
   */
  { path: 'login', component: LoginComponent },
  { path: 'login-problems', component: LoginProblemsComponent },
  { path: 'logout', component: LogoutComponent },

  /**
   * main app
   */
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'forms/request/:token', component: FormRequestComponent },
      { path: 'forms/new/:token', component: FormNewComponent },
      { path: 'forms/new', redirectTo: 'forms' },
      { path: 'forms/view/:formName/:compositionId', component: FormViewComponent },
      { path: 'forms/view', redirectTo: 'forms' },
      { path: 'forms', component: FormHistoryComponent },
      { path: 'my-details', component: MyDetailsComponent },
      { path: 'help', component: HelpComponent },
      { path: '**', component: NotFoundComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
  ]
})
export class AppRoutingModule { }
