import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PromsApi } from 'src/api/proms/proms.api';
import { AuthService } from 'src/lib/services/auth/auth.service';

type PageState = 'ok' | 'edit' | 'feedback' | 'decline' | 'expired' | 'error';

type Props = {
  loading: boolean;
  submitting: boolean;
  state: PageState;
  formName: string;
  compositionId: string;
}

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss']
})
export class FormRequestComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private promsApi: PromsApi
  ) {
    const isFeedback = this.route.snapshot.queryParamMap.get('feedback');
    if (isFeedback) {
      this.router.navigateByUrl('/');
    }
    
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  props: Props = {
    loading: true,
    submitting: false,
    state: 'ok',
    formName: '',
    compositionId: '',
  }

  private subscriptions$: Subscription[] = [];
  private token: string;

  ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(
      this.promsApi.getFormRequest(this.token).subscribe({
        next: details => {
          this.props.formName = details.formName;
          this.props.compositionId = details.compositionId || '';

          if (details.christieNumber !== this.authService.currentUser?.christieNumber) {
            this.setErrorPage();
          }

          switch (details.status) {
            case 'Expired':
              this.props.state = 'expired';
              break;
            case 'Completed':
              this.props.state = 'edit';
              break;
            default:
              this.props.state = 'ok'
              break;
          }
          
          this.props.loading = false;
        },
        error: err => this.setErrorPage()
      })
    );
  }

  onContinueRequest(): void {
    this.router.navigateByUrl(`/forms/new/${this.token}`);
  }

  onDeclineRequest(): void {
    this.props.state = 'decline';
  }

  onDeclineSubmit(reason: string): void {
    this.props.submitting = true;
    
    this.subscriptions$.push(
      this.promsApi.decline(this.token, this.props.formName, reason).subscribe({
        next: _ => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { feedback: 'y' },
            queryParamsHandling: 'merge',
            skipLocationChange: false
          });
          this.props.submitting = false;
          this.props.state = 'feedback';
        },
        error: err => this.setErrorPage()
      })
    );
  }

  onSubmitLater(): void {
    this.router.navigateByUrl('/');
  }

  onDeclineCancel(): void {
    this.props.state = 'ok';
  }

  private setErrorPage(): void {
    this.props.state = 'error';
    this.props.loading = false;
    this.props.submitting = false;
  }
}
