import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { spotifyRegex } from "../../regex/trackEmbedRegex";

const SpotifyFrame = styled.iframe`
  width: 100%;
  background: transparent;
  border: 0;
  overflow: hidden;
`;

type Props = {
  title: string;
  source: string;
};

const SpotifyEmbed = ({ title, source }: Props) => {
  const [fullSrc, setFullSrc] = useState("");
  const size = useWindowSize();
  const big = size.width >= 450;

  // const regex = /\/[\d\w]+[?]/gm;
  useEffect(() => {
    const found = source.match(spotifyRegex);
    if (found) {
      setFullSrc(
        `https://open.spotify.com/embed/track${found[0]}utm_source=generator`
      );
    }
  }, [source]);

  return (
    <SpotifyFrame
      title={title}
      src={fullSrc}
      width="100%"
      height={big ? "80" : "300"}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
};

export default SpotifyEmbed;
