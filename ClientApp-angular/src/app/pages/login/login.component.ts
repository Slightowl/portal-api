import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthApi, AuthUser } from 'src/api/auth/auth.api';
import { AuthService } from 'src/lib/services/auth/auth.service';
import { LoginFormFields } from './components/login-form/login-form.component';

type AuthStage = 'login' | 'nhs-number' | 'number' | 'code' | 'error';

type CodeSent = 'none' | 'sms' | 'email';

type Props = {
  isLoading: boolean;
  stage: AuthStage;
  numbers: string[];
  requestId?: string;
  codeSent: CodeSent;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authApi: AuthApi,
    private authService: AuthService
  ) { }

  props: Props = {
    isLoading: false,
    stage: 'login',
    numbers: [],
    codeSent: 'none',
  };

  private subscriptions$: Subscription[] = [];

  private returnUrl: string = '/';
  private token: string = '';
  private path: string = '';

  ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.token = this.route.snapshot.queryParams['token'] || '';
    this.path = this.route.snapshot.queryParams['path'] || '';
  }

  onStartAgain() {
    this.props.numbers = [];
    this.props.stage = 'login';
    this.props.codeSent = 'none';
  }

  onLogin(event: LoginFormFields): void {

    this.props.isLoading = true;

    this.subscriptions$.push(
      this.authApi.login(event.surname, event.postcode, event.dateOfBirth).subscribe({
        next: res => {
          if (res.challengeType === 'nhs') {
            this.props.stage = 'nhs-number';
          }
          else {
            if (!res.numbers || res.numbers.length === 0) {
              // code sent via email
              this.props.stage = 'code';
              this.props.codeSent = 'email';
            }
            else {
              // code sent via sms
              this.props.numbers = res.numbers || [];
              this.props.stage = 'number';
              this.props.codeSent = 'sms';
            }
          }

          this.props.requestId = res.requestId;
          this.props.isLoading = false;
        },
        error: err => this.setLoginError()
      })
    );
  }

  onSendNhsNumber(nhsNumber: string): void {
    this.props.isLoading = true;

    if (!this.props.requestId) {
      this.setLoginError();
      return;
    }

    this.subscriptions$.push(
      this.authApi.checkNhsNumber(this.props.requestId, nhsNumber).subscribe({
        next: res => {
          this.successfulLogin(res.jwt, res.user);
        },
        error: err => this.setLoginError()
      })
    );
  }

  onSendCode(number: string): void {
    this.props.isLoading = true;

    if (!this.props.requestId) {
      this.setLoginError();
      return;
    }

    this.subscriptions$.push(
      this.authApi.sendVerificationCode(this.props.requestId, number).subscribe({
        next: res => {
          this.props.stage = 'code';
          this.props.isLoading = false;
        },
        error: err => this.setLoginError()
      })
    );
  }

  onSubmitCode(code: string): void {
    this.props.isLoading = true;

    if (!this.props.requestId) {
      this.setLoginError();
      return;
    }

    this.subscriptions$.push(
      this.authApi.checkVerificationCode(this.props.requestId, code).subscribe({
        next: res => {
          this.successfulLogin(res.jwt, res.user);
        },
        error: err => this.setLoginError()
      })
    );
  }

  private successfulLogin(jwt: string, user: AuthUser): void {
    this.authService.userLoggedIn(jwt, user);

    if (this.token === '') {
      this.router.navigateByUrl(this.returnUrl);
    }
    else {
      this.router.navigateByUrl(`${PATH_MAP[this.path]}/${this.token}`);
    }
  }

  private setLoginError() {
    this.props.isLoading = false;
    this.props.stage = 'error';
  }
}

/**
 * for the link shortening described in the app-routing.module
 */
const PATH_MAP: { [key: string]: string } = {
  f: '/forms/request'
}
