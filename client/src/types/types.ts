// All custom types in alphabetical order

export type Genre = { genre_name: string };

export type Player = "Spotify" | "Tidal" | "Apple";

export type Track = {
  track_genre: string;
  track_work: string;
  track_name: string;
  track_year: number;
  track_artist: string;
  track_featured: boolean;
  track_spotify: string;
  track_tidal: string;
  track_apple: string;
};

export type Work = "Production" | "Mixing" | "Mastering" | "All";