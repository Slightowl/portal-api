import styled from "styled-components/macro";
import { Flex } from "src/components/atoms/Flex";
import { Alert } from "src/components/molecules/Alert/Alert";
import { MenuCard } from "./components/MenuCard";
import { AppRoutes } from "src/AppRoutes";
import { faListUl, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { AppName } from "src/components/molecules/AppName/AppName";
import { PendingFormItem } from "../Forms/FormHistory/components/FormItems/PendingFormItem";
import { ProgressBar } from "src/components/atoms/ProgressBar/ProgressBar";

export type PendingFormRequest = {
  id: string;
  token: string;
  sentAt: Date;
  submissionDueAt: Date;
};

export type PendingForms = {
  status: 'fetching' | 'complete',
  forms: PendingFormRequest[],
}

interface IProps {
  pendingForms: PendingForms;
}

const Div = styled.div`
  width: 100%;

  @media (min-width: ${p => p.theme.breakpointPixels.xs}) {
    max-width: 375px;
  }

  @media (min-width: ${p => p.theme.breakpointPixels.sm}) {
    max-width: 540px;
    width: 540px;
  }
`;

export const Home: React.FC<IProps> = (props): JSX.Element => {

  return (
    <div className="container">

      <AppName size="h2" center />

      <Flex col alignItems="center" className="mt-3">

        {
          props.pendingForms.status === 'fetching' && (
            <div className="py-3">
              <div className="italic mb-2">Checking for pending forms...</div>
              <ProgressBar />
            </div>
          )
        }

        {
          props.pendingForms.status === 'complete' && props.pendingForms.forms.length > 0 &&
          <Div className="mb-3">
            <Alert variant="warning">
              You have <span className="bold">{props.pendingForms.forms.length} pending forms</span>. To complete them now, please click on the links below...
            </Alert>
            {
              props.pendingForms.forms.map((x, i) => (

                <PendingFormItem key={i} token={x.token} dueAt={x.submissionDueAt} sentAt={x.sentAt} />

              ))
            }
          </Div>
        }

        <Div>
          <MenuCard
            title="My Forms"
            text="View your previous forms and questionnaire responses."
            icon={faListUl}
            linkTo={AppRoutes.forms}
          />
          <MenuCard
            title="My Details"
            text="View and manage your communication preferences."
            icon={faUserCircle}
            linkTo={AppRoutes.myDetails}
          />
        </Div>

      </Flex>

    </div>
  );
}

Home.defaultProps = {
  pendingForms: {
    status: 'fetching',
    forms: [],
  },
};
