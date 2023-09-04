import clsx from "clsx";
import styled from "styled-components/macro";

interface IProps {
  className?: string;
}

const Bar = styled.div`
  width: 100%;
`;

export const ProgressBar: React.FC<IProps> = (props): JSX.Element => {

  const cls = clsx("progress", props.className);

  return (
    <div className={cls}>
      <Bar className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" />
    </div>
  );
}
