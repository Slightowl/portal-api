import React from "react";
import styled from "styled-components/macro";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "src/components/atoms/Flex";
import { PageHeader } from "src/components/atoms/PageHeader/PageHeader";
import { ProgressBar } from "src/components/atoms/ProgressBar/ProgressBar";
import { LabelCard } from "src/components/molecules/LabelCard/LabelCard";
import { CommunicationPreferences, ContactPrefs } from "./components/ContactPrefs";
import { ContainerDiv } from "./components/ContainerDiv";
import { ErrorModal } from "src/components/organisms/ErrorModal";

export type UserDetails = {
  name: string;
  mobile: string;
  email: string;
}

interface IProps {
  user?: UserDetails;
  prefs: CommunicationPreferences;
  prefsLoading: 'loading' | 'loaded' | 'error';
  prefsSaving: 'initial' | 'saving' | 'saved' | 'error';
  onSave: (newPrefs: CommunicationPreferences) => void;
  onRetryError: () => void;
}

const Icon = styled(FontAwesomeIcon)`
  font-size: 72px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const MyDetails: React.FC<IProps> = (props): JSX.Element => {

  return (
    <>
      <PageHeader title="My Details" />

      <ContainerDiv>

        <Flex className="row" justifyContent="center">
          <Icon icon={faUserCircle} fixedWidth={true} />
        </Flex>

        {
          props.user &&
          <>
            <LabelCard label="Name" text={props.user.name} />
            <LabelCard label="Mobile" text={props.user.mobile} />
            <LabelCard label="Email" text={props.user.email} />
          </>
        }

        {
          props.prefsLoading === 'loading'
            ? <ProgressBar />
            : (
              <ContactPrefs
                prefs={props.prefs}
                prefsSaving={props.prefsSaving}
                onSave={props.onSave}
              />
            )
        }

      </ContainerDiv>

      <ErrorModal show={props.prefsSaving === 'error'} onRetry={props.onRetryError} />
    </>
  );
}
