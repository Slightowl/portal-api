import { Pixels } from "src/utils/types";

interface IProps {
  name: string;
  alt?: string;
  height?: Pixels;
  width?: Pixels;
  className?: string;
}

export const Img: React.FC<IProps> = (props): JSX.Element => (
  <img
    className={props.className}
    alt={props.alt}
    src={`/assets/${props.name}`}
    height={props.height}
    width={props.width}
  />
);
