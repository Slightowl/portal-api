import clsx from "clsx";
import styled from "styled-components/macro";

interface IProps extends React.PropsWithChildren {
  label: string;
  text?: string;
  className?: string;
}

const Card = styled.div`
  border: none;
  background-color: transparent;
`;

export const LabelCard: React.FC<IProps> = (props): JSX.Element => {

  const cls = clsx('card', props.className);

  return (
    <Card className={cls}>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">{props.label}</h6>
        {
          props.text
            ? <h5 className="card-title">{props.text}</h5>
            : props.children
        }
      </div>
    </Card>
  );
}
