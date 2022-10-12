type TGenre = { genre_name: string };

type TPlayer = "Spotify" | "Tidal" | "Apple";

type TText = {
  name: string;
  stored_text: string[];
};

type TTextTitle = "about" | "contact" | "pricing" | "hire";

type TInfoTextTitle = Exclude<TTextTitle, "about" | "pricing"> | "services";

type TTrack = {
  track_id: number;
  track_genre: string;
  track_work: string;
  track_name: string;
  track_year: number;
  track_artist: string;
  track_album: string;
  track_featured: boolean;
  track_spotify: string;
  track_tidal: string;
  track_apple: string;
  numOrder?: number;
};

type TWork = "Production" | "Mixing" | "Mastering" | "All";

export type {
  TGenre,
  TPlayer,
  TText,
  TTextTitle,
  TInfoTextTitle,
  TWork,
  TTrack,
};
