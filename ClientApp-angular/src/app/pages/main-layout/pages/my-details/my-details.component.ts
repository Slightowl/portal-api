import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { PreferencesApi, CommunicationPreferences } from 'src/api/preferences/preferences.api';
import { AuthService } from 'src/lib/services/auth/auth.service';
import { fadeInOut } from 'src/lib/utils/animations';

type UserDetails = {
  name: string;
  mobile: string;
  email: string;
}

type Props = {
  loading: boolean;
  saving: boolean;
  showSuccess: boolean;
  showError: boolean;
  hasChanged: boolean;
  user?: UserDetails;
  communicationPrefs?: CommunicationPreferences
  showOptOutWarning: boolean;
}

@Component({
  selector: 'app-my-details',
  animations: [fadeInOut],
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private prefsApi: PreferencesApi
  ) { }

  props: Props = {
    loading: true,
    saving: false,
    showSuccess: false,
    showError: false,
    hasChanged: false,
    user: undefined,
    communicationPrefs: undefined,
    showOptOutWarning: false,
  };

  private subscriptions$: Subscription[] = [];
  private initialCommsPrefs?: CommunicationPreferences;

  ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (!user) {
      this.handleError();
      return;
    }

    this.props.user = {
      name: `${user.forename} ${user.surname}`,
      email: user.email,
      mobile: user.phone,
    };

    this.subscriptions$.push(
      this.prefsApi.getCommunicationPreferences().pipe(
        finalize(() => {
          this.props.loading = false;
        })).subscribe({
          next: prefs => {
            this.initialCommsPrefs = { ...prefs };
            this.props.communicationPrefs = prefs;
          },
          error: err => this.handleError()
        })
    );
  }

  onEmailPrefChanged($event: any) {
    if (this.props && this.props.communicationPrefs) {
      this.props.communicationPrefs.contactViaEmail = !this.props.communicationPrefs?.contactViaEmail
    }

    this.checkChanges();
  }

  onSmsPrefChanged($event: any) {
    if (this.props && this.props.communicationPrefs) {
      this.props.communicationPrefs.contactViaSms = !this.props.communicationPrefs?.contactViaSms
    }

    this.checkChanges();
  }

  save(): void {
    if (!this.props.communicationPrefs) {
      return;
    }

    this.props.saving = true;

    this.subscriptions$.push(
      this.prefsApi.updateCommunicationPreferences(this.props.communicationPrefs).subscribe({
        next: res => {
          this.initialCommsPrefs = <CommunicationPreferences>{ ...this.props.communicationPrefs };
          this.checkChanges()
          this.props.saving = false;

          this.props.showSuccess = true;
          setTimeout(() => {
            this.props.showSuccess = false;
          }, 2000);
        },
        error: err => this.handleError()
      })
    );
  }

  cancel(): void {
    this.props.communicationPrefs = <CommunicationPreferences>{ ...this.initialCommsPrefs };
    this.props.hasChanged = false;
    this.props.showOptOutWarning = false;
  }

  hideError() {
    this.props.showError = false;
  }

  private checkChanges() {
    this.props.hasChanged =
      this.initialCommsPrefs?.contactViaEmail !== this.props.communicationPrefs?.contactViaEmail
      || this.initialCommsPrefs?.contactViaSms !== this.props.communicationPrefs?.contactViaSms;

    this.props.showOptOutWarning =
      this.props.communicationPrefs?.contactViaEmail === false
      && this.props.communicationPrefs?.contactViaSms === false;
  }

  private handleError(): void {
    this.props.loading = false;
    this.props.saving = false;

    this.props.showError = true;
  }
}
