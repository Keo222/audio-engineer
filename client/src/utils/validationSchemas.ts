import * as Yup from "yup";
import { spotifyRegex, tidalRegex, appleRegex } from "./regex/trackEmbedRegex";

export const TrackFormValidation = Yup.object({
  name: Yup.string()
    .required("Track title required")
    .max(255, "Track title too long"),
  album: Yup.string()
    .required("Album title required")
    .max(255, "Album title too long"),
  artist: Yup.string()
    .required("Artist name required")
    .max(255, "Artist name too long"),
  year: Yup.number()
    .required("Year required")
    .integer("Year not valid")
    .min(1900, "Year too low")
    .max(3000, "Year too high"),
  spotify: Yup.string()
    .required("Spotify URL required")
    .matches(spotifyRegex, "Invalid Spotify URL"),
  tidal: Yup.string()
    .required("Tidal URL required")
    .matches(tidalRegex, "Invalid Tidal URL"),
  apple: Yup.string()
    .required("Apple Music URL required")
    .matches(appleRegex, "Invalid Apple Music URL"),
});
