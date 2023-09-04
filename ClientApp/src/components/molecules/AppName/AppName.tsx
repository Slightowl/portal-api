import styled from "styled-components/macro";

interface IProps {
  size?: 'h1' | 'h2' | 'lg';
  center?: boolean;
}

const H1 = styled.h1<IProps>`
  color: ${p => p.theme.palette.primary.main};
  text-align: ${p => p.center ? 'center' : 'left'};
  margin-bottom: 16px;
`;

const H2 = styled.h2<IProps>`
  color: ${p => p.theme.palette.primary.main};
  text-align: ${p => p.center ? 'center' : 'left'};
  margin-bottom: 16px;
`;

const Span = styled.span<IProps>`
  color: ${p => p.theme.palette.primary.main};
  text-align: ${p => p.center ? 'center' : 'left'};
  font-size: 20px;
`;

export const AppName: React.FC<IProps> = (props): JSX.Element => {

  const name = (
    <>
      <span className="bold">My Christie, </span>
      <span className="italic">My Health</span>
    </>
  );

  return props.size === 'h1'
    ? <H1 {...props}>{name}</H1>
    : props.size === 'h2'
      ? <H2 {...props}>{name}</H2>
      : <Span {...props}>{name}</Span>;
};

AppName.defaultProps = {
  size: 'h1',
  center: false,
}
