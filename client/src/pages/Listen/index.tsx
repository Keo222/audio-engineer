import { useState, useEffect } from "react";
import styled from "styled-components";
import { animated } from "react-spring";

// Components
import MusicSlider from "components/musicPlayers/MusicSlider";

// Types
import { Player, Work, Track } from "types";

import {
  spotifyWhite,
  spotifyColor,
  tidalWhite,
  tidalColor,
  appleWhite,
  appleColor,
} from "icons";

// Imported Styled Components
import { PageHeading } from "styled/typography";

// Styled Components Types
type Selectable = { selected: boolean };

// Styled Components
const PageDiv = styled.div`
  margin-bottom: 10rem;
`;

const ContainerOfSelects = styled.div`
  display: flex;
  width: clamp(250px, 85%, 1400px);
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const SelectPlayerDiv = styled.div`
  margin: 2rem 0 5rem;
`;

const SelectPlayerLabel = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  color: ${(props) => props.theme.color.textLight};
`;

const SelectPlayerLogos = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: bottom;
`;

const Logo = styled(animated.img)`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-left: 3rem;
  cursor: pointer;
  user-select: none;
  filter: green;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

const WorkSelect = styled.div<Selectable>`
  font-size: 1.4rem;
  font-weight: 600;
  height: 9rem;
  width: 30%;
  background: ${(props) => (props.selected ? "#404040" : "#606060")};
  border-radius: 55px;
  overflow: hidden;
`;

const WorkTrio = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 12%;
  border: 1px solid ${(props) => props.theme.color.textDark};
  overflow: hidden;
  box-shadow: 5px 0px 20px rgba(0, 0, 0, 0.4);
`;
const TrioItem = styled.div`
  display: flex;
  height: 6rem;
  align-items: center;
  justify-content: center;
  flex: 1;
  outline: 1px solid ${(props) => props.theme.color.textDark};
  filter: initial;
  transition: all 0.15s;
  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
  }
`;
const ProductionTrioItem = styled(TrioItem)<Selectable>`
  background: ${(props) =>
    props.selected
      ? props.theme.color.highlight1
      : props.theme.color.textLight};
`;
const MixingTrioItem = styled(TrioItem)<Selectable>`
  background: ${(props) =>
    props.selected
      ? props.theme.color.highlight2
      : props.theme.color.textLight};
`;
const MasteringTrioItem = styled(TrioItem)<Selectable>`
  background: ${(props) =>
    props.selected
      ? props.theme.color.highlight3
      : props.theme.color.textLight};
`;

const AllWorkSelect = styled.div<Selectable>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.selected
      ? props.theme.color.highlight1
      : props.theme.color.textLight};
  height: 3rem;
  transition: all 0.15s;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.color.highlight1};
  }
`;

const GenreSelectDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25rem;
`;

const GenreSelect = styled.select`
  height: fit-content;
  font-family: inherit;
  font-size: 1.4rem;
  padding: 0.6rem;
  border-radius: 5px;
  &:focus {
    outline: 3px solid ${(props) => props.theme.color.highlight1};
  }
`;

const Listen = () => {
  const [player, setPlayer] = useState<Player>("Spotify");
  const [tracks, setTracks] = useState<Track[] | [] | null>(null);
  const [filteredTracks, setFilteredTracks] = useState<
    Track[] | [] | null
  >(null);
  const [genres, setGenres] = useState<string[] | [] | null>(null);
  const [currentGenre, setCurrentGenre] = useState<string>("All");
  const [work, setWork] = useState<Work>("All");

  useEffect(() => {
    localStorage.setItem("player", player);
  }, [player]);

  const changePlayer = (newPlayer: Player) => {
    setPlayer(newPlayer);
  };

  async function getTracks() {
    const response = await fetch("/api/tracks/");
    const allTracks = await response.json();
    console.table(allTracks);
    setTracks(allTracks);

    const genreSet = new Set();
    allTracks.map((t: Track) => genreSet.add(t.track_genre));
    const genreList = Array.from(genreSet) as string[];
    setGenres(genreList);
  }

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

  useEffect(() => {
    getTracks();
  }, []);

  useEffect(() => {
    const getFilteredTracks = () => {
      let filtered;
      if (tracks !== null) {
        if (currentGenre === "All" && work === "All") {
          filtered = tracks;
        } else if (work === "All") {
          filtered = tracks.filter(
            (t: Track) => t.track_genre === currentGenre
          );
        } else if (currentGenre === "All") {
          filtered = trackWorkSwitch(tracks, work);
        } else {
          const genreFilteredTracks = tracks.filter(
            (t) => t.track_genre === currentGenre
          );
          filtered = trackWorkSwitch(genreFilteredTracks, work);
        }
      }
      console.log(filtered);
      if (filtered !== null) {
        return filtered;
      } else {
        return null;
      }
    };
    const filtered = getFilteredTracks();
    if (typeof filtered !== "undefined") {
      setFilteredTracks(filtered);
    } else {
      setFilteredTracks(null);
    }
  }, [tracks, work, currentGenre]);

  const trackWorkSwitch = (trackArray: Track[], work: Work) => {
    switch (work) {
      case "Production":
        return trackArray.filter((t) => t.track_work === "Production");
      case "Mixing":
        return trackArray.filter(
          (t) =>
            t.track_work === "Mix" ||
            t.track_work === "Mixed" ||
            t.track_work === "Mix + Edit" ||
            t.track_work === "Mix & Master" ||
            t.track_work === "Mixed & Mastered"
        );
      case "Mastering":
        return trackArray.filter(
          (t) =>
            t.track_work === "Mastered" ||
            t.track_work === "Master" ||
            t.track_work === "Mix & Master"
        );
      case "All":
        return trackArray;
      default:
        return trackArray;
    }
  };

  return (
    <PageDiv>
      <title>Joel Gardella | Listen</title>
      <PageHeading>Listen</PageHeading>
      <ContainerOfSelects>
        <SelectPlayerDiv>
          <SelectPlayerLabel>Select Streaming Service:</SelectPlayerLabel>
          <SelectPlayerLogos>
            <Logo
              src={player === "Spotify" ? spotifyColor : spotifyWhite}
              alt="spotify logo unselected"
              onClick={() => changePlayer("Spotify")}
            />
            <Logo
              src={player === "Tidal" ? tidalColor : tidalWhite}
              alt="apple logo unselected"
              onClick={() => changePlayer("Tidal")}
            />
            <Logo
              src={player === "Apple" ? appleColor : appleWhite}
              alt="apple logo unselected"
              onClick={() => changePlayer("Apple")}
            />
          </SelectPlayerLogos>
        </SelectPlayerDiv>
        <WorkSelect selected={work === "All"}>
          <WorkTrio>
            <ProductionTrioItem
              onClick={() => setWork("Production")}
              selected={work === "Production"}
            >
              Production
            </ProductionTrioItem>
            <MixingTrioItem
              onClick={() => setWork("Mixing")}
              selected={work === "Mixing"}
            >
              Mixing
            </MixingTrioItem>
            <MasteringTrioItem
              onClick={() => setWork("Mastering")}
              selected={work === "Mastering"}
            >
              Mastering
            </MasteringTrioItem>
          </WorkTrio>
          <AllWorkSelect
            onClick={() => setWork("All")}
            selected={work === "All"}
          >
            All
          </AllWorkSelect>
        </WorkSelect>
        <GenreSelectDiv>
          <GenreSelect onChange={(e) => setCurrentGenre(e.target.value)}>
            <option>All</option>
            {genres !== null &&
              genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
          </GenreSelect>
        </GenreSelectDiv>
      </ContainerOfSelects>
      {genres !== null &&
        filteredTracks !== null &&
        currentGenre === "All" && (
          <div>
            {filteredTracks.filter((t: Track) => t.track_featured).length >
              0 && (
              <MusicSlider
                key={`${work} - Featured`}
                tracks={filteredTracks.filter(
                  (t: Track) => t.track_featured
                )}
                player={player}
                genre="Featured"
              />
            )}
            {genres
              .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
              .map((g) => (
                <MusicSlider
                  key={g}
                  tracks={
                    tracks
                      ? tracks.filter((t: Track) => t.track_genre === g)
                      : []
                  }
                  player={player}
                  genre={g}
                />
              ))}
          </div>
        )}
      {filteredTracks !== null && currentGenre !== "All" && (
        <div>
          {filteredTracks.map((t) => (
            <MusicSlider
              key={t.track_name}
              tracks={[t]}
              player={player}
              genre={`${t.track_name} - ${t.track_artist}`}
            />
          ))}
        </div>
      )}
    </PageDiv>
  );
};

export default Listen;
