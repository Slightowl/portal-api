import styled from "styled-components/macro";

interface IProps {
  title: string;
}

const Div = styled.div`
  background-color: ${p => p.theme.palette.primary.main};
  color: ${p => p.theme.palette.primary.contrastText};
  padding: 4px 16px;
  font-size: 20px;
  text-align: center;
`;

export const PageHeader: React.FC<IProps> = (props): JSX.Element => {

  return (
    <Div>{props.title}</Div>
  );
}
