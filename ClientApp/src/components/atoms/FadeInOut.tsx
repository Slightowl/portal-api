import React from "react";

interface IProps extends React.PropsWithChildren {
  timeout?: number;
}

export const FadeInOut: React.FC<IProps> = (props): JSX.Element | null => {
  const [mounted, setMounted] = React.useState<boolean>(true);
  const [showing, setShowing] = React.useState<boolean>(true);
  const [style, setStyle] = React.useState({
    opacity: 0, transition: 'none'
  });

  React.useEffect(() => {
    setTimeout(() => {
      setStyle({ opacity: 1, transition: "all 0.5s ease" });
      setTimeout(() => {
        setStyle({ opacity: 0, transition: "all 1s ease" });
        setShowing(false);
      }, props.timeout)
    }, 100);
  }, [mounted, props.timeout]);

  const transitionEnd = () => {
    if (!showing) {
      setMounted(false)
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div style={style} onTransitionEnd={transitionEnd}>
      {props.children}
    </div>
  );
};

FadeInOut.defaultProps = {
  timeout: 2000,
};