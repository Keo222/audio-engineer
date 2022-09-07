import { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Types
import type { TPlayer, TWork, TTrack } from "types";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import ListenControls from "./pageComponents/ListenControls";

// Styled Components
import { PageHeading } from "styled/typography";
import TrackList from "./pageComponents/TrackList";

const PageDiv = styled.div`
  margin-bottom: 10rem;
`;

const Listen = () => {
  const [player, setPlayer] = useState<TPlayer>("Spotify");
  const [tracks, setTracks] = useState<TTrack[]>();
  const [currentGenre, setCurrentGenre] = useState<string>("All");
  const [work, setWork] = useState<TWork>("All");

  // Get tracks from DB
  useEffect(() => {
    async function getTracks() {
      try {
        const response = await fetch("/api/tracks/");
        const allTracks = await response.json();
        setTracks(allTracks);
      } catch (error) {
        console.error(error);
      }
    }
    getTracks();
  }, []);

  // Retrieves player from localStorage if it's there and adds it to localStorage when you leave the page
  useEffect(() => {
    const localPlayer = localStorage.getItem("player");
    if (
      localPlayer === "Spotify" ||
      localPlayer === "Tidal" ||
      localPlayer === "Apple"
    ) {
      setPlayer(localPlayer);
    }
  }, []);

  // Parse genres from tracks
  const getTrackGenres = (trackArr: TTrack[] | undefined) => {
    if (trackArr) {
      const genreSet = new Set();
      trackArr.map((t: TTrack) => genreSet.add(t.track_genre));
      const genreList = Array.from(genreSet) as string[];
      return genreList;
    }
  };
  const genres = getTrackGenres(tracks);

  return (
    <PageLayout>
      <Helmet>
        <title>Audio Engineer | Listen</title>
        <meta
          name="description"
          content="Audio Engineers portofolio displaying tracks they've mixed, mastered, and produced."
        />
      </Helmet>
      <PageDiv>
        <PageHeading>Listen</PageHeading>
        <ListenControls
          player={player}
          setPlayer={setPlayer}
          work={work}
          setWork={setWork}
          genres={genres}
          setCurrentGenre={setCurrentGenre}
        />
        <TrackList
          genres={genres}
          tracks={tracks}
          currentGenre={currentGenre}
          work={work}
          player={player}
        />
      </PageDiv>
    </PageLayout>
  );
};

export default Listen;
