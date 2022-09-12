import React from "react";
import styled from "styled-components";

// Styled Components
const GenreDisplayToggle = styled.div`
  width: 280px;
  height: 5rem;
  margin: 0 auto;
  display: none;
  border-radius: 100px;
  overflow: hidden;
  @media screen and (max-width: 800px) {
    display: flex;
  }
`;

const AddGenreToggle = styled.div<{ displayList: boolean }>`
  background-color: ${(props) =>
    props.displayList
      ? props.theme.color.grayedOut
      : props.theme.color.highlight1};
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.textDark};
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.3s;
  &:hover {
    filter: brightness(0.7);
  }
`;
const ViewGenresToggle = styled(AddGenreToggle)`
  background-color: ${(props) =>
    props.displayList
      ? props.theme.color.highlight3
      : props.theme.color.grayedOut};
`;

type Props = {
  displayList: boolean;
  setDisplayList: React.Dispatch<React.SetStateAction<boolean>>;
};

const GenreToggle = ({ displayList, setDisplayList }: Props) => {
  return (
    <GenreDisplayToggle>
      <ViewGenresToggle
        displayList={displayList}
        onClick={() => setDisplayList(true)}
      >
        View &amp; Remove
      </ViewGenresToggle>
      <AddGenreToggle
        displayList={displayList}
        onClick={() => setDisplayList(false)}
      >
        Add Genre
      </AddGenreToggle>
    </GenreDisplayToggle>
  );
};

export default GenreToggle;
