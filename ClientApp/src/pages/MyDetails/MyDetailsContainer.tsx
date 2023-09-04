import React from 'react';
import authApi from 'src/api/auth/auth-api';
import api from 'src/api/preferences/preferences-api';
import { CommunicationPreferences } from './components/ContactPrefs';
import { MyDetails, UserDetails } from './MyDetails';

const DEFAULT_PREFS: CommunicationPreferences = {
  contactViaEmail: false,
  contactViaSms: false,
  contactViaPost: false,
}

export const MyDetailsContainer: React.FC = (props): JSX.Element => {
  const [prefs, setPrefs] = React.useState<CommunicationPreferences>(DEFAULT_PREFS);
  const [user, setUser] = React.useState<UserDetails>();
  const [loading, setLoading] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [saving, setSaving] = React.useState<'initial' | 'saving' | 'saved' | 'error'>('initial');

  React.useEffect(() => {
    setSaving('initial');

    const fetchPrefs = async () => {
      try {
        setLoading('loading');

        const commsPrefs = await api.getCommunicationPreferences();
        setPrefs(commsPrefs);

        const userDetails = await authApi.getAuthUser();
        setUser({
          name: `${userDetails.forename} ${userDetails.surname}`,
          email: userDetails.email,
          mobile: userDetails.phone,
        });

        setLoading('loaded')
      } catch (error) {
        setLoading('error');
      }
    }

    fetchPrefs();
  }, []);

  const save = async (newPrefs: CommunicationPreferences) => {
    try {
      setSaving('saving');
      await api.updateCommunicationPreferences(newPrefs);
      setPrefs(newPrefs);
      setSaving('saved');
    }
    catch (error) {
      setSaving('error');
    }
  }

  return (
    <MyDetails
      user={user}
      prefs={prefs}
      prefsLoading={loading}
      prefsSaving={saving}
      onSave={prefs => save(prefs)}
      onRetryError={() => {
        setLoading('loaded');
        setSaving('initial');
      }}
    />
  );
}
