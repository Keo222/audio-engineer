import React from "react";
import styled from "styled-components";

// Styled Components
const GenreSelectDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12vw;
`;

const SelectGenre = styled.select`
  height: fit-content;
  font-family: inherit;
  font-size: 1.4rem;
  padding: 0.6rem;
  border-radius: 5px;
  &:focus {
    outline: 3px solid ${(props) => props.theme.color.highlight1};
  }
`;
type Props = {
  genres: string[] | undefined;
  setCurrentGenre: React.Dispatch<React.SetStateAction<string>>;
};

const GenreSelect = ({ genres, setCurrentGenre }: Props) => {
  return (
    <GenreSelectDiv>
      <SelectGenre onChange={(e) => setCurrentGenre(e.target.value)}>
        <option>All</option>
        {genres &&
          genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
      </SelectGenre>
    </GenreSelectDiv>
  );
};

export default GenreSelect;
