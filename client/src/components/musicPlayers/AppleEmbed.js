import React from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { appleRegex } from "../../regex/trackEmbedRegex";

const AppleFrame = styled.iframe`
  width: 100%;
  overflow: hidden;
  background: transparent;
  border: 0;
`;

const AppleEmbed = ({ title, source }) => {
  const size = useWindowSize();
  const big = size.width >= 450;

  // const regex = /\/[\d\w-%&]+\/[\d]+[?i=]{3}[\d]+/gm;
  const found = source.match(appleRegex);
  const fullSrc = `https://embed.music.apple.com/us/album${found[0]}`;
  return (
    <AppleFrame
      title={title}
      allow="autoplay *; encrypted-media *; fullscreen *"
      frameborder="0"
      height={big ? "150" : "120"}
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      src={fullSrc}
    />
  );
};

export default AppleEmbed;
