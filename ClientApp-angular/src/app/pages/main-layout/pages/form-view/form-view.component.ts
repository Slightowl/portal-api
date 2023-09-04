import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/lib/services/auth/auth.service';
import { Logger } from 'src/lib/services/logging/logger';
import { AppState } from 'src/lib/store/reducers';
import { getEhrId } from 'src/lib/store/selectors';
import * as Ehr from '../ehr-config';

type Props = {
  loading: boolean;
  formRendered: boolean;
  showError: boolean;
  form: Ehr.FormConfig | null;
  environment: { variables: { name: string, value: string }[] } | null,
};

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit, OnDestroy {
  constructor(
    route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
    private logger: Logger
  ) {
    const formName = route.snapshot.paramMap.get('formName');
    const compositionId = route.snapshot.paramMap.get('compositionId');

    if (!formName || !compositionId) {
      this.router.navigateByUrl('/forms');
      return;
    }

    const formConfig = Ehr.getFormConfig(
      formName,
      this.authService.jwt ?? '',
      compositionId,
      true,
      'patient-portal'
    );

    this.props = {
      ...this.props,
      form: formConfig,
    }
  }

  props: Props = {
    loading: true,
    formRendered: false,
    showError: false,
    form: null,
    environment: { variables: [] },
  };

  private subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(
      this.store.select(getEhrId).subscribe({
        next: ehrId => {
          if (!ehrId) {
            this.handleError();
            return;
          }
          this.props.environment?.variables.push({ name: 'ehrId', value: ehrId });
          this.props.loading = false;
        },
        error: err => this.handleError()
      })
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
    if (!$event.detail?.success) {
      this.logger.error($event.detail?.error?.message ?? 'Error saving composition');
      this.handleError();
      return;
    }
  }

  private handleError(): void {
    this.props.showError = true;
    this.props.loading = false;
  }
}
