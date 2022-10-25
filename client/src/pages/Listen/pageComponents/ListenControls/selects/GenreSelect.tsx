import React from "react";
import styled from "styled-components";

// Styled Components
const GenreSelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 12vw;
  gap: 5px;
  @media screen and (max-width: 600px) {
    align-items: center;
  }
`;

const GenresLabel = styled.label`
  color: ${(props) => props.theme.color.textLight};
  font-size: 17px;
  font-weight: 300;
`;

const SelectGenre = styled.select`
  height: fit-content;
  font-family: inherit;
  font-size: 14px;
  border: none;
  padding: 0.6rem;
  border-radius: 5px;
  /* Needed to make Safari <select> element to look the same */
  /* appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 4px; */

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
      <GenresLabel htmlFor="genres">Genre:</GenresLabel>
      <SelectGenre
        onChange={(e) => setCurrentGenre(e.target.value)}
        name="genres"
        id="genres"
      >
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
