import React from "react";

export type WindowDimensions = {
  height: number;
  width: number;
}

const getWindowDimensions = (): WindowDimensions => {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight,
  };
}

export const useWindowDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = React.useState<WindowDimensions>(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}