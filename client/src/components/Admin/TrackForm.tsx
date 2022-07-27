import styled from "styled-components";

// Formik
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Components

// Styled Components
import {
  InputGroup,
  InputLabel,
  SelectDiv,
  RadioDiv,
  SubmitButton,
} from "../../styled/forms";

const StyledFormik = styled(Form)`
  color: ${(props) => props.theme.color.textLight};
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  width: clamp(250px, 80%, 600px);
  margin: 0 auto;
`;

const StyledField = styled(Field)`
  width: 100%;
`;

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
`;

// Props
type Props = {
  initValues: {
    name: string;
    album: string;
    artist: string;
    year: string;
    genre: string;
    work: string;
    featured: boolean;
    spotifySrc: string;
    tidalSrc: string;
    appleSrc: string;
  };
  genreList: string[];
};

const TrackForm = ({ initValues, genreList }: Props) => {
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          album: Yup.string().required("Required"),
          artist: Yup.string().required("Required"),
          year: Yup.string().required("Required"),
          genre: Yup.string().required("Required"),
          work: Yup.string().required("Required"),
          featured: Yup.boolean().required("Required"),
          spotifySrc: Yup.string().required("Required"),
          tidalSrc: Yup.string().required("Required"),
          appleSrc: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.table(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <StyledFormik>
          <InputGroup>
            <InputLabel htmlFor="name">Track Name:</InputLabel>
            <StyledField
              type="text"
              name="name"
              placeholder='ex: "Bohemian Rhapsody"'
            />
            <ErrorMessage component={StyledErrorMessage} name="name" />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="album">Album:</InputLabel>
            <StyledField
              type="text"
              name="album"
              placeholder='ex: "A Night at the Opera"'
            />
            <ErrorMessage component={StyledErrorMessage} name="album" />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="artist">Artist:</InputLabel>
            <StyledField type="text" name="artist" placeholder='ex: "Queen"' />
            <ErrorMessage component={StyledErrorMessage} name="artist" />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="year">Year:</InputLabel>
            <StyledField
              type="number"
              step="1"
              name="year"
              placeholder='ex: "2000"'
            />
            <ErrorMessage name="year" />
          </InputGroup>

          <SelectDiv>
            <InputGroup>
              <InputLabel htmlFor="genre">Genre:</InputLabel>
              <StyledField name="genre" as="select">
                {genreList.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </StyledField>
              <ErrorMessage name="genre" />
            </InputGroup>
            <InputGroup>
              <InputLabel htmlFor="work">Type of Work:</InputLabel>
              <StyledField name="work" as="select">
                <option value="Mix">Mix</option>
                <option value="Mix + Edit">Mix + Edit</option>
                <option value="Master">Master</option>
                <option value="Mix & Master">Mix & Master</option>
                <option value="Production">Production</option>
              </StyledField>
              <ErrorMessage name="work" />
            </InputGroup>
          </SelectDiv>

          <RadioDiv>
            <p>Featured:</p>
            <label>
              <Field
                type="radio"
                name="featured"
                checked={initValues.featured === true}
              />
              Yes
            </label>
            <label>
              <Field
                type="radio"
                name="featured"
                checked={initValues.featured === false}
              />
              No
            </label>
          </RadioDiv>
          <ErrorMessage name="featured" />

          <InputGroup>
            <InputLabel htmlFor="spotify">Spotify Source:</InputLabel>
            <StyledField
              type="text"
              name="spotifySrc"
              placeholder='ex: "https://open.spotify.com/track/5eIDxmWYxRA0HJBYM9bIIS?si=668accca5b864e0b"'
            />

            <ErrorMessage name="spotifySrc" />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="tidal">Tidal Source:</InputLabel>
            <StyledField
              type="text"
              name="tidalSrc"
              placeholder='ex: "https://tidal.com/browse/track/77814875"'
            />
            <ErrorMessage name="tidalSrc" />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="apple">Apple Music Source:</InputLabel>
            <StyledField
              type="text"
              name="appleSrc"
              placeholder='ex: "https://music.apple.com/us/album/bohemian-rhapsody/1440806041?i=1440806768"'
            />
            <ErrorMessage name="appleSrc" />
          </InputGroup>

          <SubmitButton type="submit">Add Track</SubmitButton>
        </StyledFormik>
      </Formik>
    </div>
  );
};

export default TrackForm;
