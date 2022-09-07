import { useMemo } from "react";
import type { TPlayer, TTrack, TWork } from "types";

import MusicSlider from "components/musicPlayers/MusicSlider";

type Props = {
  genres: string[] | undefined;
  tracks: TTrack[] | undefined;
  currentGenre: string;
  work: TWork;
  player: TPlayer;
};

const TrackList = ({
  genres,
  tracks,
  currentGenre,
  work,
  player,
}: Props) => {
  const filteredTracks = useMemo(() => {
    const trackWorkSwitch = (trackArray: TTrack[], work: TWork) => {
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
    if (tracks) {
      if (currentGenre === "All" && work === "All") {
        return tracks;
      } else if (work === "All") {
        return tracks.filter(
          (t: TTrack) => t.track_genre === currentGenre
        );
      } else if (currentGenre === "All") {
        return trackWorkSwitch(tracks, work);
      } else {
        const genreFilteredTracks = tracks.filter(
          (t) => t.track_genre === currentGenre
        );
        return trackWorkSwitch(genreFilteredTracks, work);
      }
    }
  }, [currentGenre, tracks, work]);

  return (
    <>
      {genres &&
        filteredTracks &&
        currentGenre === "All" &&
        work === "All" && (
          <section aria-label="Track">
            {typeof filteredTracks !== "undefined" &&
              filteredTracks.filter((t: TTrack) => t.track_featured)
                .length > 0 && (
                <MusicSlider
                  key={`${work} - Featured`}
                  tracks={filteredTracks.filter(
                    (t: TTrack) => t.track_featured
                  )}
                  player={player}
                  genre="Featured"
                  rounded={player === "Spotify"}
                />
              )}
            {genres &&
              genres
                .sort((a, b) =>
                  a.toLowerCase() > b.toLowerCase() ? 1 : -1
                )
                .map((g) => (
                  <MusicSlider
                    key={g}
                    tracks={
                      filteredTracks
                        ? filteredTracks.filter(
                            (t: TTrack) => t.track_genre === g
                          )
                        : []
                    }
                    player={player}
                    genre={g}
                    rounded={player === "Spotify"}
                  />
                ))}
          </section>
        )}
      {filteredTracks && !(currentGenre === "All" && work === "All") && (
        <section aria-label="Tracks">
          {typeof filteredTracks !== "undefined" &&
            filteredTracks.map((t) => (
              <MusicSlider
                key={t.track_name}
                tracks={[t]}
                player={player}
                genre={`${t.track_name} - ${t.track_artist}`}
                rounded={player === "Spotify"}
              />
            ))}
        </section>
      )}
    </>
  );
};

export default TrackList;
