import React from 'react';
import styled, { css } from 'styled-components/macro';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { primary } from './styles/Primary';
import { secondary } from './styles/Secondary';
import { error } from './styles/Error';
import { ButtonColor, ButtonSize, ButtonVariant } from './styles/_types';
import { warning } from './styles/Warning';

interface IProps {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  square?: boolean;
  label?: string;
  bold?: boolean
  icon?: IconProp;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const ButtonStyled = styled.button<IProps>`
  ${p =>
    p.color === 'primary' ? primary.fromVariant(p.variant)
      : p.color === 'secondary' ? secondary.fromVariant(p.variant)
        : p.color === 'warning' ? warning.fromVariant(p.variant)
          : error.fromVariant(p.variant)
  };

  ${p => p.variant !== 'link' && css`text-decoration: none;`}

  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  font-weight: ${p => p.bold ? 600 : 400};

  padding: .375rem .75rem;
  font-size: 1rem;
  border-radius: .25rem;

  ${p => p.size === 'large' && css`
    padding: .5rem 1rem;
    font-size: 1.25rem;
    border-radius: .3rem;
  `}

  ${p => p.size === 'small' && css`
    padding: .25rem .5rem;
    font-size: .875rem;
    border-radius: .2rem;
  `}

  ${p => p.fullWidth && css`width: 100%;`}
  ${p => p.square && css`border-radius: 0;`}
`;

export const Button: React.FC<IProps> = (props): JSX.Element => {

  return (
    <ButtonStyled
      role="button"
      name={props.label || props.type || 'Button'}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {
        props.icon
          ? props.icon && <FontAwesomeIcon
            icon={props.icon}
            fixedWidth={true}
            size={
              props.size === 'small' ? 'sm'
                : props.size === 'medium' ? '1x'
                  : 'lg'
            } />
          : props.label
      }
    </ButtonStyled>
  )
};

Button.defaultProps = {
  color: 'primary',
  variant: 'standard',
  size: 'medium',
  fullWidth: false,
  type: 'button',
  disabled: false,
}
