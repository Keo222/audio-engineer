import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";

const MiddleDiv = styled.div``;

type Props = { children: React.ReactNode };

const MiddleCard = ({ children }: Props) => {
  const [screenWidth, setScreenWidth] = useState<number>();

  useLayoutEffect(() => {
    const initWidth = window.innerWidth;
    setScreenWidth(initWidth);
  }, []);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setScreenWidth(newWidth);
  };
  window.addEventListener("resize", handleResize);

  return (
    <>
      {screenWidth && screenWidth > 1000 && (
        <MiddleDiv>{children}</MiddleDiv>
      )}
    </>
  );
};

export default MiddleCard;
