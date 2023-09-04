import React, { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  ms: number;
}

export const Delay: React.FC<IProps> = (props): JSX.Element => {
  const [isShown, setIsShown] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, props.ms);

    return () => clearTimeout(timer);
  }, [props.ms]);

  return isShown ? <>{props.children}</> : <></>
}