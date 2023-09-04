import { Link, To } from "react-router-dom";
import styled from "styled-components/macro";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "src/components/atoms/Flex";

interface IProps {
  icon: IconDefinition;
  title: string;
  text: string;
  linkTo: To;
}

const Card = styled.div<IProps>`
  &:hover {
    background-color: ${p => p.theme.palette.light};
  }

  .card-link {
    color: ${p => p.theme.palette.primary.main};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 48px;
  color: ${p => p.theme.palette.black};

  @media (min-width: ${p => p.theme.breakpointPixels.md}) {
    font-size: 64px;
  }
`;

const IconFlex = styled(Flex)`
  padding: 8px;
  background-color: ${p => p.theme.palette.greyLight};

  @media (min-width: ${p => p.theme.breakpointPixels.sm}) {
    padding: 12px;
  }

  @media (min-width: ${p => p.theme.breakpointPixels.md}) {
    padding: 16px;
    min-height: 120px;
  }
`;

export const MenuCard: React.FC<IProps> = (props): JSX.Element => {

  return (
    <Card {...props} className="card mb-3 w-100">
      <div className="row g-0">
        <IconFlex col alignItems="center" justifyContent="center" className="col-md-3">
          <Icon icon={props.icon} fixedWidth />
        </IconFlex>
        <div className="col-md-9">
          <div className="card-body">
            <Link to={props.linkTo} className="card-link stretched-link">
              <h5 className="card-title">{props.title}</h5>
            </Link>
            <p className="card-text">
              {props.text}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
