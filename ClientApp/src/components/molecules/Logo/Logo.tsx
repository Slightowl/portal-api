import styled from "styled-components/macro";
import { Img } from "../../atoms/Img";

interface IProps { }

const Div = styled.div`
  padding: 1rem 0;
`;

const ImgStyled = styled(Img)`
  height: 5rem;
`;

export const Logo: React.FC<IProps> = (props): JSX.Element => {

  return (
    <Div>
      <ImgStyled alt="Christie Logo" name="logo.png" />
    </Div>
  );
}
