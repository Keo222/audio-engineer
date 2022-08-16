// All custom types in alphabetical order

export type TGenre = { genre_name: string };

export type TPlayer = "Spotify" | "Tidal" | "Apple";

export type TText = {
  name: string;
  stored_text: string[];
};

export type TTextTitle = "about" | "contact" | "pricing" | "hire";

export type TTrack = {
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

export type TWork = "Production" | "Mixing" | "Mastering" | "All";
