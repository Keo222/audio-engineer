import React from "react";
import styled from "styled-components";

// Types
import type { TPlayer, TWork } from "types";

// Components
import {
  StreamingServiceSelect,
  WorkSelect,
  GenreSelect,
} from "./selects";

// Styled Components
const SelectsSection = styled.section`
  display: flex;
  width: clamp(250px, 85%, 1400px);
  margin: 40px auto;
  align-items: start;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    justify-items: center;
    gap: 40px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, min-content);
  }
`;

type Props = {
  player: TPlayer;
  setPlayer: React.Dispatch<React.SetStateAction<TPlayer>>;
  work: TWork;
  setWork: React.Dispatch<React.SetStateAction<TWork>>;
  genres: string[] | undefined;
  setCurrentGenre: React.Dispatch<React.SetStateAction<string>>;
};

const ListenControls = ({
  player,
  setPlayer,
  work,
  setWork,
  genres,
  setCurrentGenre,
}: Props) => {
  return (
    <SelectsSection aria-label="Track Controls">
      <StreamingServiceSelect player={player} setPlayer={setPlayer} />
      <WorkSelect work={work} setWork={setWork} />
      <GenreSelect genres={genres} setCurrentGenre={setCurrentGenre} />
    </SelectsSection>
  );
};

export default ListenControls;
