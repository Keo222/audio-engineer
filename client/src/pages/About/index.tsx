import { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import BackgroundImage from "./pageComponents/BackgroundImage";
import ContactLogos from "components/ContactLogos";

// Styled Components
import { PageHeading, FormattedParagraph } from "styled/typography";

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
        <meta name="description" content="About Audio Engineer" />
      </Helmet>
      <BackgroundImage />
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
