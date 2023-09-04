import React from "react";
import { useWindowDimensions } from "src/utils/useWindowDimensions";
import { useTheme } from "styled-components/macro";

interface IProps {
  showAt: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  element: JSX.Element;
  default?: JSX.Element;
}

export const Breakpoint: React.FC<IProps> = (props): JSX.Element => {
  const { width } = useWindowDimensions();
  const { breakpoints } = useTheme();

  const minWidth = breakpoints[props.showAt];

  return (
    <>
      {
        width >= minWidth
          ? props.element
          : props.default
      }
    </>
  );
}
