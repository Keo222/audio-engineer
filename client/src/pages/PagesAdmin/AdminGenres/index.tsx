import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

// Helper Functions
import { getGenres } from "utils/functions";

// Types
import type { TGenre } from "types";

// Layout
import AdminLayout from "layouts/AdminLayout";

// Components
import { AddGenre, GenreList, GenreToggle } from "./pageComponents";

// Styled Elements
import { PageHeading } from "styled/typography";

const GenrePageDiv = styled.div`
  color: ${(props) => props.theme.color.textLight};
`;

const SectionsContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 5rem 0;
  justify-content: space-evenly;
`;

const AdminGenres = () => {
  const [genres, setGenres] = useState<TGenre[] | []>([]);
  const [displayList, setDisplayList] = useState(true);

  const fetchGenres = useCallback(async () => {
    const allGenres = await getGenres();
    if (allGenres !== undefined && allGenres.length !== 0) {
      setGenres(allGenres);
    }
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <AdminLayout>
      <GenrePageDiv>
        <title>JG Admin | Genres</title>
        <PageHeading>Genres</PageHeading>
        <GenreToggle
          displayList={displayList}
          setDisplayList={setDisplayList}
        />
        <SectionsContainer>
          <GenreList genres={genres} displayList={displayList} />
          <AddGenre
            genres={genres}
            setGenres={setGenres}
            displayList={displayList}
          />
        </SectionsContainer>
      </GenrePageDiv>
    </AdminLayout>
  );
};

export default AdminGenres;
