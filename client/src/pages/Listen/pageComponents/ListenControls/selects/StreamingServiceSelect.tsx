import React from "react";
import type { TPlayer } from "types";

import styled from "styled-components";

import {
  spotifyWhite,
  spotifyColor,
  tidalWhite,
  tidalColor,
  appleWhite,
  appleColor,
} from "images/icons";

// Styled Components
const SelectPlayerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectPlayerLabel = styled.h4`
  font-size: 1.6rem;
  font-weight: 300;
  margin-block: 0;
  color: ${(props) => props.theme.color.textLight};
`;

const SelectPlayerLogos = styled.div`
  display: flex;
  align-items: bottom;
  gap: 3rem;
  margin-left: 3rem;

  @media screen and (max-width: 600px) {
    margin-left: 0;
  }
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: pointer;
  user-select: none;
  filter: green;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

type Props = {
  player: TPlayer;
  setPlayer: React.Dispatch<React.SetStateAction<TPlayer>>;
};

const StreamingServiceSelect = ({ player, setPlayer }: Props) => {
  return (
    <SelectPlayerSection aria-labelledby="player-select-header">
      <SelectPlayerLabel id="player-select-header">
        Select Streaming Service:
      </SelectPlayerLabel>
      <SelectPlayerLogos>
        <Logo
          src={player === "Spotify" ? spotifyColor : spotifyWhite}
          alt="spotify logo unselected"
          onClick={() => setPlayer("Spotify")}
        />
        <Logo
          src={player === "Tidal" ? tidalColor : tidalWhite}
          alt="apple logo unselected"
          onClick={() => setPlayer("Tidal")}
        />
        <Logo
          src={player === "Apple" ? appleColor : appleWhite}
          alt="apple logo unselected"
          onClick={() => setPlayer("Apple")}
        />
      </SelectPlayerLogos>
    </SelectPlayerSection>
  );
};

export default StreamingServiceSelect;
