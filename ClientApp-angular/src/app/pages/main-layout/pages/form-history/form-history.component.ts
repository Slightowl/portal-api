import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { FormRequest, PromsApi } from 'src/api/proms/proms.api';
import { AuthService } from 'src/lib/services/auth/auth.service';

type Props = {
  loading: boolean;
  error: boolean;
  showPendingForms: boolean;
  pendingFormRequests: FormRequest[];
  formRequests: FormRequest[];
}

@Component({
  selector: 'app-form-history',
  templateUrl: './form-history.component.html',
  styleUrls: ['./form-history.component.scss']
})
export class FormHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private promsApi: PromsApi,
  ) { }

  props: Props = {
    loading: true,
    error: false,
    showPendingForms: true,
    formRequests: [],
    pendingFormRequests: [],
  };

  private subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$?.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    if (!this.authService.currentUser?.christieNumber) {
      this.props.error = true;
      this.props.loading = false;
      return;
    }

    this.subscriptions$.push(

      combineLatest([
        this.promsApi.getFormRequests()
      ]).subscribe({
        next: ([formRequests]) => {
          this.props.formRequests = formRequests || [];
          this.props.formRequests.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());

          this.props.pendingFormRequests = this.props.formRequests.filter(x => x.status === 'Pending');
          this.props.pendingFormRequests.sort((a, b) => new Date(a.submissionDueAt).getTime() - new Date(b.submissionDueAt).getTime());

          this.props.loading = false;
        },
        error: err => {
          this.props.error = true;
          this.props.loading = false;
        }
      }),

    );
  }

  setShowPendingForms(showPendingForms: boolean): void {
    this.props.showPendingForms = showPendingForms;
  }
}
