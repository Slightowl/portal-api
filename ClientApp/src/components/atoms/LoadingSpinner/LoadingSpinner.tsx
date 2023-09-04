import styled from "styled-components/macro"
import { Delay } from "../Delay";

interface IProps { }

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  padding-top: 64px;
`

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #3d5af1 transparent #3d5af1 transparent;
  border-radius: 50%;
  animation: spin-anim 1.2s linear infinite;

  @keyframes spin-anim {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner: React.FC<IProps> = (props): JSX.Element => (
  <SpinnerContainer>
    <Delay ms={500}>
      <Spinner />
    </Delay>
  </SpinnerContainer>
)
