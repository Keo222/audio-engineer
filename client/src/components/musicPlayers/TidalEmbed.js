import React from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";

const TidalFrame = styled.iframe`
  top: 0;
  left: 0;
  width: 100%;
  /* height: 80px; */
  height: ${(props) => (props.big ? "80px" : "200px")};
  border: 0;
`;

const TidalEmbed = ({ title, source }) => {
  const size = useWindowSize();
  const big = size.width >= 550;
  const grid = big ? "" : "?layout=gridify";

  const regex = /\/[\d]+$/gm;
  const found = source.match(regex);
  const fullSrc = `https://embed.tidal.com/tracks${found[0]}`;
  return (
    <TidalFrame
      big={big}
      title={title}
      artist="Eledy"
      src={fullSrc + grid}
      allowfullscreen
      allow="encrypted-media;"
    />
  );
};

// <div style="position: relative; padding-bottom: 100%; height: 0; overflow: hidden; max-width: 100%;">
//   <iframe
//     src="https://embed.tidal.com/tracks/160329063?layout=gridify"
//     frameborder="0"
//     allowfullscreen
//     style="position: absolute; top: 0; left: 0; width: 100%; height: 1px; min-height: 100%; margin: 0 auto;"
//   ></iframe>
// </div>;

export default TidalEmbed;
