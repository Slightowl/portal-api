import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "src/components/atoms/Button/Button";
import { FadeInOut } from "src/components/atoms/FadeInOut";
import { FieldSet } from "src/components/atoms/FieldSet";
import { ProgressBar } from "src/components/atoms/ProgressBar/ProgressBar";
import { Alert } from "src/components/molecules/Alert/Alert";
import { LabelCard } from "src/components/molecules/LabelCard/LabelCard";
import { SwitchInput } from "src/components/atoms/SwitchInput/SwitchInput";
import { WarningModal } from "src/components/organisms/WarningModal";

export type CommunicationPreferences = {
  contactViaSms: boolean;
  contactViaEmail: boolean;
  contactViaPost: boolean;
}

interface IProps {
  prefs: CommunicationPreferences;
  prefsSaving: 'initial' | 'saving' | 'saved' | 'error';
  onSave: (newPrefs: CommunicationPreferences) => void;
}

const DEFAULT_PREFS: CommunicationPreferences = {
  contactViaEmail: true,
  contactViaPost: true,
  contactViaSms: true,
};

export const ContactPrefs: React.FC<IProps> = (props): JSX.Element => {
  const [prefs, setPrefs] = React.useState<CommunicationPreferences>(DEFAULT_PREFS);

  React.useEffect(() => {
    setPrefs(props.prefs);
  }, [props.prefs]);

  const reset = () => setPrefs(props.prefs);

  const updateSms = (val: boolean): void => setPrefs({ ...prefs, contactViaSms: val });
  const updateEmail = (val: boolean): void => setPrefs({ ...prefs, contactViaEmail: val });

  const save = () => {
    props.onSave({
      contactViaEmail: prefs.contactViaEmail,
      contactViaSms: prefs.contactViaSms,
      contactViaPost: prefs.contactViaPost,
    });
  };

  const hasChanged =
    prefs.contactViaEmail !== props.prefs.contactViaEmail
    || prefs.contactViaSms !== props.prefs.contactViaSms;

  const showWarning =
    prefs.contactViaSms === false
    && prefs.contactViaEmail === false
    && (props.prefs.contactViaSms || props.prefs.contactViaEmail);

  return (
    <>
      <LabelCard label="Preferences">
        <FieldSet disabled={props.prefsSaving === 'saving'}>
          <SwitchInput label="Contact me via SMS" size="lg" checked={prefs.contactViaSms} onCheckedChange={updateSms} />
          <SwitchInput label="Contact me via email" size="lg" checked={prefs.contactViaEmail} onCheckedChange={updateEmail} />
        </FieldSet>
      </LabelCard>

      {
        hasChanged && (
          <>
            <Button fullWidth label="Save changes" disabled={props.prefsSaving === 'saving'} className="mt-3" onClick={save} />
            {
              props.prefsSaving === 'saving'
                ? <ProgressBar className="mt-3" />
                : <Button fullWidth label="Cancel" variant="link" className="mt-2" onClick={reset} />
            }
          </>
        )
      }
      {
        props.prefsSaving === 'saved' &&
        <FadeInOut>
          <Alert text="Changes saved" icon={faCheck} className="mt-3" />
        </FadeInOut>
      }

      <WarningModal show={showWarning} onCancel={reset}>
        <div className="mb-2">
          This will prevent you from receiving questionnaires and forms in the future, and opt you out of this program.
        </div>
        <div>
          Are you sure you want to continue?
        </div>
      </WarningModal>
    </>
  );
}
