import styled from "styled-components/macro";

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

const LabelStyled = styled.label`
  font-weight: 600;
  padding-left: 4px;
  margin-bottom: 4px;
  color: ${p => p.theme.palette.greyDark};
`;

export const Label: React.FC<IProps> = (props): JSX.Element => (
  <LabelStyled className={`form-label ${props.className}`} {...props}>
    {props.children}
  </LabelStyled>
)
