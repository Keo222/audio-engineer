import { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import ContactLogos from "components/ContactLogos";

// Images
import aboutImgSrc from "images/about_filler.jpg";

// Styled Components
import { PageHeading, FormattedParagraph } from "styled/typography";

const AboutImg = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -5;
  object-fit: cover;
  width: 40vw;
  height: 100vh;
  filter: brightness(0.5) grayscale(0.2);
  @media screen and (${(props) => props.theme.responsive.lg}) {
    width: 80vw;
    filter: brightness(0.25) grayscale(0.6);
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 100vw;
    filter: brightness(0.22) grayscale(0.3);
  }
`;

const ImgOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -4;
  width: 40vw;
  height: 100vh;
  background: linear-gradient(
      to right,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to bottom right,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 50%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to bottom,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to bottom left,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to left,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to top left,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to top,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to top right,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    );
  @media screen and (${(props) => props.theme.responsive.lg}) {
    width: 80vw;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 100vw;
  }
`;

const AboutInfoContainer = styled.div`
  width: 60vw;
  margin-left: auto;
  margin-bottom: 5rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 100vw;
  }
`;

const AboutInfoSection = styled.section`
  width: 70%;
  margin: 0 auto;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 80vw;
  }
`;

const About = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    const getText = async () => {
      const fetch_url = "/api/text?name=about";
      try {
        const response = await fetch(fetch_url);
        const { stored_text } = await response.json();
        setText(stored_text);
      } catch (err) {
        console.error(err);
      }
    };
    getText();
  }, []);
  return (
    <PageLayout>
      <Helmet>
        <title>Audio Engineer | About</title>
      </Helmet>
      <ImgOverlay />
      <AboutImg src={aboutImgSrc} />
      <AboutInfoContainer>
        <AboutInfoSection aria-labelledby="about-header">
          <PageHeading id="about-header">About</PageHeading>
          {text.map((p, i) => (
            <FormattedParagraph key={i}>{p}</FormattedParagraph>
          ))}
        </AboutInfoSection>
        <ContactLogos />
      </AboutInfoContainer>
    </PageLayout>
  );
};

export default About;
