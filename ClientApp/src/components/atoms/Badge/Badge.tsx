import clsx from "clsx";
import styled from "styled-components/macro";

interface IProps {
  variant?: 'primary' | 'accent' | 'danger' | 'default';
  text?: string;
  hint?: string;
  rounded?: boolean;
  topRight?: boolean;
  border?: boolean;
}

const Span = styled.span<IProps>`
  background-color: ${p =>
    p.variant === 'primary' ? p.theme.palette.primary.main
      : p.variant === 'accent' ? p.theme.palette.accent.main
        : p.variant === 'danger' ? p.theme.palette.danger
          : p.theme.palette.grey
  };

  color: ${p =>
    p.variant === 'primary' ? p.theme.palette.primary.contrastText
      : p.variant === 'accent' ? p.theme.palette.accent.contrastText
        : p.variant === 'danger' ? p.theme.palette.white
          : p.theme.palette.white
  };
`;

export const Badge: React.FC<IProps> = (props): JSX.Element => {

  const cls = clsx(
    'badge',
    props.topRight && 'position-absolute top-0 start-100 translate-middle',
    !props.text && 'p-2',
    props.rounded && 'rounded-pill',
    props.border && 'border'
  );

  return (
    <span className="pos-relative">
      <Span className={cls} {...props} role="status">
        {props.text && <span>{props.text}</span>}
        {props.hint && <span className="visually-hidden">{props.hint}</span>}
      </Span>
    </span>
  );
}

Badge.defaultProps = {
  variant: 'default',
}