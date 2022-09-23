import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { tidalRegex } from "utils/regex/trackEmbedRegex";

const TidalFrame = styled.iframe<{ big: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.big ? "80px" : "200px")};
  border: 0;
`;

type Props = {
  title: string;
  source: string;
};

const TidalEmbed = ({ title, source }: Props) => {
  const [fullSrc, setFullSrc] = useState("");
  const size = useWindowSize();
  const big = size.width >= 550;
  const grid = big ? "" : "?layout=gridify";

  useEffect(() => {
    const found = source.match(tidalRegex);
    if (found) {
      setFullSrc(`https://embed.tidal.com/tracks${found[0]}`);
    }
  }, [source]);

  return (
    <TidalFrame
      big={big}
      title={title}
      src={fullSrc + grid}
      allow="encrypted-media;"
    />
  );
};

export default TidalEmbed;
