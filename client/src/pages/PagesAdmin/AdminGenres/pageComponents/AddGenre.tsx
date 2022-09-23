import React, { useState } from "react";

import styled from "styled-components";

// Types
import { TGenre } from "types";

// Styled Components
import { ErrorMessage } from "styled/forms";
import { GenreSection } from "../styled";
const AddGenreDiv = styled(GenreSection)<{ displayList: boolean }>`
  @media screen and (max-width: 800px) {
    display: ${(props) => (props.displayList ? "none" : "initial")};
  }
`;

const AddNewForm = styled.form`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

const InputGroup = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  min-width: 270px;
  justify-content: center;
`;

const InputLabel = styled.label`
  font-size: 1.4rem;
  margin-right: 1rem;
`;

const InputText = styled.input`
  flex: 1;
`;

const SubmitButton = styled.button<{ errorPresent: boolean }>`
  margin: ${(props) => (props.errorPresent ? "0.5rem 0 3rem" : "3rem 0")};
  border: none;
  padding: 0.8rem 2rem;
  font-family: inherit;
  font-weight: 500;
  border-radius: 5px;
  background: ${(props) => props.theme.color.highlight1};
  color: ${(props) => props.theme.color.textDark};
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
`;

type Props = {
  genres: TGenre[];
  setGenres: React.Dispatch<React.SetStateAction<TGenre[]>>;
  displayList: boolean;
};

const AddGenre = ({ genres, setGenres, displayList }: Props) => {
  const [newGenre, setNewGenre] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  const addGenre = async (e: React.MouseEvent<Element, MouseEvent>) => {
    let data = {
      newGenre: newGenre,
    };
    try {
      if (
        genres &&
        !(newGenre === "") &&
        !genres.some(
          (g) => g.genre_name.toLowerCase() === newGenre.toLowerCase()
        ) &&
        newGenre.length <= 255
      ) {
        const res = await fetch("/api/genres/", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });
        console.log(res);
        setGenres((genres) => [...genres, { genre_name: newGenre }]);
        setNewGenre("");
      } else {
        e.preventDefault();
        if (newGenre === "") {
        } else if (
          genres.some(
            (g) => g.genre_name.toLowerCase() === newGenre.toLowerCase()
          )
        ) {
          setErrorMsg("Genre name must be unique.");
        } else if (newGenre.length > 255) {
          setErrorMsg("Genre name too long.");
        }
        setError(true);
        return;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <AddGenreDiv displayList={displayList}>
      <h3>Add Genre</h3>
      <AddNewForm>
        <InputGroup>
          <InputLabel htmlFor="genre">New Genre:</InputLabel>
          <InputText
            type="text"
            name="genre"
            placeholder='ex: "Indie Rock"'
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
          />
        </InputGroup>
        {error && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <SubmitButton errorPresent={error} onClick={(e) => addGenre(e)}>
          Add Genre
        </SubmitButton>
      </AddNewForm>
    </AddGenreDiv>
  );
};

export default AddGenre;
