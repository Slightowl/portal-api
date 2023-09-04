import { PropsWithChildren, useEffect, useRef } from "react";

interface IProps extends PropsWithChildren {
  onClickAway: () => void;
}

export const ClickAwayListener: React.FC<IProps> = (props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onClickAway();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props, ref]);

  return (
    <div ref={ref}>{props.children}</div>
  );
}
