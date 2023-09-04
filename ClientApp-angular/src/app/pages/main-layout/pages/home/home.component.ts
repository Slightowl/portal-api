import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormRequest } from 'src/api/proms/proms.api';
import { Logger } from 'src/lib/services/logging/logger';
import { AppState } from 'src/lib/store/reducers';
import { getFormRequestsInStatus } from 'src/lib/store/selectors';

type Props = {
  hasPendingForms: boolean;
  pendingForms: FormRequest[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private logger: Logger
  ) { }

  props: Props = {
    hasPendingForms: false,
    pendingForms: [],
  }

  private subscriptions$: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(
      this.store
          .select(getFormRequestsInStatus('Pending'))
          .subscribe({
            next: proms => {
              this.props.pendingForms = proms;
              this.props.hasPendingForms = proms.length > 0;
          },
          error: err => {
            this.logger.warn('Error fetching pending proms from state store.');
          }
      })
    );
  }
}
