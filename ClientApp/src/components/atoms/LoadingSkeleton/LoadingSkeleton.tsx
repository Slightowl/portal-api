import styled from "styled-components/macro";

type Size = { height: string, width: string };

interface IProps {
  type: 'line' | 'box' | 'item' | Size;
  lineWidth?: string;
}

const Shimmer = styled.div<{ height: string, width: string }>`
  height: ${p => p.height};
  width: ${p => p.width};

  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 800px;
  display: inline-block;
  position: relative;

  animation: placeholderShimmer 1.5s infinite;
  -webkit-animation: placeholderShimmer 1.5s infinite;

  @keyframes placeholderShimmer {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }

  @-webkit-keyframes placeholderShimmer {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }
`;

export const LoadingSkeleton: React.FC<IProps> = (props): JSX.Element => {

  if (props.type === 'box') {
    return <Shimmer height="100px" width="100px" />;
  }
  else if (props.type === 'line') {
    return <Shimmer height="16px" width={props.lineWidth || '100%'} />;
  }
  else if (props.type === 'item') {
    return (
      <>
        <Shimmer height="14px" width="100px" />
        <Shimmer height="18px" width={props.lineWidth || '100%'} />
      </>
    );
  }
  else {
    return <Shimmer height={props.type.height} width={props.type.width} />;
  }
}
