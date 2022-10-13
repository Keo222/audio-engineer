import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";

// Components
import NewTrackForm from "./components/NewTrackForm";

// Types
import type { TGenre } from "types";

// Layout
import AdminLayout from "layouts/AdminLayout";

// Styled Components
import { PageHeading } from "styled/typography";

const AdminTracks = () => {
  const [genreList, setGenreList] = useState<string[]>();

  const getGenres = useCallback(async () => {
    const response = await fetch("/api/genres/");
    const allGenres = await response.json();
    const sortedGenres = allGenres
      .sort((a: TGenre, b: TGenre) =>
        a.genre_name.toLowerCase() > b.genre_name.toLowerCase() ? 1 : -1
      )
      .map((g: TGenre) => g.genre_name);
    setGenreList(sortedGenres);
  }, []);

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <AdminLayout>
      <Helmet>
        <title>JG Admin | New Track</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHeading>Add Track</PageHeading>
      <NewTrackForm genreList={genreList} />
    </AdminLayout>
  );
};

export default AdminTracks;
