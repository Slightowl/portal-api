import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { PromsApi } from 'src/api/proms/proms.api';
import { AuthService } from 'src/lib/services/auth/auth.service';
import { Logger } from 'src/lib/services/logging/logger';
import { NEW_PROM_COMPLETED } from 'src/lib/store/actions';
import { AppState } from 'src/lib/store/reducers';
import { getEhrId } from 'src/lib/store/selectors';
import * as Ehr from '../ehr-config';

type Props = {
  loading: boolean;
  formRendered: boolean;
  isComplete: boolean;
  showError: boolean;
  form: Ehr.FormConfig | null;
  environment: { variables: { name: string, value: string }[] } | null,
};

@Component({
  selector: 'app-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss']
})
export class FormNewComponent implements OnInit, OnDestroy {

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private promsApi: PromsApi,
    private store: Store<AppState>,
    private logger: Logger
  ) {
    const token = route.snapshot.paramMap.get('token');

    if (!token) {
      this.router.navigateByUrl('/forms');
      return;
    }

    this.token = token;
  }

  props: Props = {
    loading: true,
    formRendered: false,
    isComplete: false,
    showError: false,
    form: null,
    environment: { variables: [] },
  };

  private token: string = '';
  private subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(

      combineLatest([
        this.promsApi.getFormRequest(this.token),
        this.store.select(getEhrId)
      ]).subscribe({
        next: ([details, ehrId]) => {
          if (details.christieNumber !== this.authService.currentUser?.christieNumber) {
            this.router.navigateByUrl('/forms');
            return;
          }

          if (details.status == 'Completed') {
            this.router.navigateByUrl(`/forms/view/${details.formName}/${details.compositionId}`);
            return;
          }

          if (!ehrId) {
            this.handleError();
            return;
          }

          const formConfig = Ehr.getFormConfig(
            details.formName,
            this.authService.jwt ?? '',
            undefined,
            false,
            'patient-portal'
          );

          this.props = {
            ...this.props,
            loading: false,
            form: formConfig,
            environment: {
              ...this.props.environment,
              variables: [
                ...this.props.environment?.variables ?? [],
                { name: 'ehrId', value: ehrId }
              ]
            }
          }
        },
        error: err => this.handleError()
      }),
    );
  }

  hideError() {
    this.props.showError = false;
  }

  formRendered($event: any): void {
    this.props.formRendered = true;
  }

  pageChange($event: any): void {
    // this.logger.error($event);
  }

  handleSavedComposition($event: Ehr.CompositionSavedEvent): void {
    this.logger.info(`handleSavedComposition\n${$event}`);

    if (!$event.detail?.success) {
      this.logger.error($event.detail?.error?.message ?? 'Error saving composition');
      this.handleError();
      return;
    }

    if ($event.detail?.uid) {
      this.store.dispatch(NEW_PROM_COMPLETED({
        token: this.token,
        compositionId: $event.detail?.uid
      }))
    }

    this.props.isComplete = true;
  }

  private handleError(): void {
    this.props.showError = true;
    this.props.loading = false;
  }
}
