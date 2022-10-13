import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

// Types
import { TTrack } from "types";

// Regex
import {
  spotifyRegex,
  tidalRegex,
  appleRegex,
} from "utils/regex/trackEmbedRegex";

// Form Options
import { workOptions } from "utils/formOptions";

// Styled Components
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SelectDiv,
  RadioDiv,
  RadioGroup,
  SubmitButton,
} from "styled/forms";
const ErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${(props) => props.theme.color.highlight3};
`;

type Props = {
  id: TTrack["track_id"];
  trackName: TTrack["track_name"];
  artist: TTrack["track_artist"];
  work: TTrack["track_work"];
  year: TTrack["track_year"];
  genre: TTrack["track_genre"];
  featured: TTrack["track_featured"];
  spotify: TTrack["track_spotify"];
  tidal: TTrack["track_tidal"];
  apple: TTrack["track_apple"];
  album: TTrack["track_album"];
  genreList: string[];
};

const UpdateForm = ({
  id,
  trackName,
  artist,
  work,
  year,
  genre,
  featured,
  spotify,
  tidal,
  apple,
  album,
  genreList,
}: Props) => {
  const navigate = useNavigate();

  const updateTrack = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let data = {
      id: id,
      name: trackName,
      artist: artist,
      work: work,
      year: year,
      genre: genre,
      featured: featured,
      spotify: spotify,
      tidal: tidal,
      apple: apple,
      album: album,
    };
    try {
      const res = await fetch("/api/tracks", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log(res.status);
      navigate("/admin/tracks");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: trackName,
        album: album,
        artist: artist,
        work: !workOptions.includes(work) ? workOptions[0] : work,
        year: year,
        genre: !genreList.includes(genre) ? genreList[0] : genre,
        featured: featured === true ? "yes" : "no",
        spotify: spotify,
        tidal: tidal,
        apple: apple,
      }}
      validationSchema={Yup.object({
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
      })}
      onSubmit={async ({
        name,
        artist,
        work,
        year,
        genre,
        featured,
        spotify,
        tidal,
        apple,
        album,
      }) => {
        let data = {
          id: id,
          name: name,
          artist: artist,
          work: work,
          year: year,
          genre: genre,
          featured: featured,
          spotify: spotify,
          tidal: tidal,
          apple: apple,
          album: album,
        };
        try {
          const res = await fetch("/api/tracks", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
          });
          console.log(res.status);
          navigate("/admin/tracks");
        } catch (err: any) {
          console.error(err.message);
        }
      }}
    >
      {(formik) => (
        <StyledForm onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="track-name">Track Name:</InputLabel>
            <TextInput
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <ErrorMessage>{formik.errors.name}</ErrorMessage>
            ) : null}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="album">Album:</InputLabel>
            <TextInput
              id="album"
              name="album"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.album}
            />
            {formik.touched.album && formik.errors.album ? (
              <ErrorMessage>{formik.errors.album}</ErrorMessage>
            ) : null}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="artist">Artist:</InputLabel>
            <TextInput
              id="artist"
              type="text"
              name="artist"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.artist}
            />
            {formik.touched.artist && formik.errors.artist ? (
              <ErrorMessage>{formik.errors.artist}</ErrorMessage>
            ) : null}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="year">Year:</InputLabel>
            <TextInput
              id="year"
              type="number"
              min="1900"
              max="3000"
              step="1"
              name="year"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            />
            {formik.touched.year && formik.errors.year ? (
              <ErrorMessage>{formik.errors.year}</ErrorMessage>
            ) : null}
          </InputGroup>

          <SelectDiv>
            <InputGroup>
              <InputLabel htmlFor="genre">Genre:</InputLabel>
              <select
                name="genre"
                id="genre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genre}
              >
                {genreList.map((g: string) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="work">Type of Work:</InputLabel>
              <select
                id="work"
                name="work"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.work}
              >
                {workOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </InputGroup>
          </SelectDiv>

          <RadioDiv>
            <p>Featured:</p>
            <RadioGroup>
              <Field id="featured" name="featured" type="radio" value="yes" />
              <label htmlFor="featured">Yes</label>
            </RadioGroup>
            <RadioGroup>
              <input
                id="not-featured"
                name="featured"
                type="radio"
                value="no"
              />
              <label htmlFor="not-featured">No</label>
            </RadioGroup>
          </RadioDiv>

          <InputGroup>
            <InputLabel htmlFor="spotify">Spotify Source:</InputLabel>
            <TextInput
              type="text"
              name="spotify"
              id="spotify"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.spotify}
            />
            {formik.touched.spotify && formik.errors.spotify ? (
              <ErrorMessage>{formik.errors.spotify}</ErrorMessage>
            ) : null}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="tidal">Tidal Source:</InputLabel>
            <TextInput
              type="text"
              name="tidal"
              id="tidal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tidal}
            />
            {formik.touched.tidal && formik.errors.tidal ? (
              <ErrorMessage>{formik.errors.tidal}</ErrorMessage>
            ) : null}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="apple">Apple Music Source:</InputLabel>
            <TextInput
              type="text"
              name="apple"
              id="apple"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apple}
            />
            {formik.touched.apple && formik.errors.apple ? (
              <ErrorMessage>{formik.errors.apple}</ErrorMessage>
            ) : null}
          </InputGroup>

          <SubmitButton type="submit" disabled={formik.isSubmitting}>
            Update Track
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default UpdateForm;
