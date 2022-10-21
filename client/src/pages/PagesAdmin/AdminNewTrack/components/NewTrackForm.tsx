import { Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";

// Form Validation
import { TrackFormValidation } from "utils/validationSchemas";

// Work Dropdown Options
import { workOptions } from "utils/formOptions";

// Styled Components
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SelectDiv,
  StyledSelect,
  RadioDiv,
  RadioGroup,
  SubmitButton,
  ErrorMessage,
} from "styled/forms";

type Props = {
  genreList: string[] | undefined;
};

const NewTrackForm = ({ genreList }: Props) => {
  const navigate = useNavigate();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: "",
        album: "",
        artist: "",
        work: workOptions[0],
        year: new Date().getFullYear(),
        genre: genreList ? genreList[0] : "",
        featured: "no",
        spotify: "",
        tidal: "",
        apple: "",
      }}
      validationSchema={TrackFormValidation}
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
          name: name,
          artist: artist,
          work: work,
          year: year,
          genre: genre,
          featured: featured === "yes" ? true : false,
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
            method: "POST",
            body: JSON.stringify(data),
          });
          navigate("/admin/tracks");
        } catch (err: any) {
          console.error(err.message);
        }
      }}
    >
      {(formik) => (
        <StyledForm onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="name">Track Name:</InputLabel>
            <TextInput
              type="text"
              name="name"
              id="name"
              placeholder='ex: "Bohemian Rhapsody"'
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
              type="text"
              name="album"
              id="album"
              placeholder='ex: "A Night at the Opera"'
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
              type="text"
              name="artist"
              id="artist"
              placeholder='ex: "Queen"'
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
              type="number"
              step="1"
              name="year"
              id="year"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            />
          </InputGroup>

          <SelectDiv>
            <InputGroup>
              <InputLabel htmlFor="genre">Genre:</InputLabel>
              <StyledSelect
                name="genre"
                id="genre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.genre}
              >
                {genreList &&
                  genreList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </StyledSelect>
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="work">Type of Work:</InputLabel>
              <StyledSelect
                name="work"
                id="work"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.work}
              >
                {workOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </StyledSelect>
            </InputGroup>
          </SelectDiv>

          <RadioDiv>
            <p>Featured:</p>
            <RadioGroup>
              <Field
                id="featured"
                name="featured"
                type="radio"
                value="yes"
                checked={formik.values.featured === "yes"}
              />
              <label htmlFor="featured">Yes</label>
            </RadioGroup>
            <RadioGroup>
              <input
                id="not-featured"
                name="featured"
                type="radio"
                value="no"
                checked={formik.values.featured === "no"}
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
              placeholder='ex: "https://open.spotify.com/track/5eIDxmWYxRA0HJBYM9bIIS?si=668accca5b864e0b"'
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
              placeholder='ex: "https://tidal.com/browse/track/77814875"'
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
              placeholder='ex: "https://music.apple.com/us/album/bohemian-rhapsody/1440806041?i=1440806768"'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apple}
            />
            {formik.touched.apple && formik.errors.apple ? (
              <ErrorMessage>{formik.errors.apple}</ErrorMessage>
            ) : null}
          </InputGroup>

          <SubmitButton type="submit">Add Track</SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default NewTrackForm;
