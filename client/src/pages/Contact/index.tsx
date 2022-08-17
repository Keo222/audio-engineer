import { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Styled Components
import { PageHeading, SmallFormattedParagraph } from "styled/typography";
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SubmitButton,
} from "styled/forms";

const PageWrapper = styled.div`
  margin-bottom: 4rem;
`;
const ContactGuidelinesSection = styled.section`
  min-width: 200px;
  width: 60%;
  max-width: 700px;
  border: 2px solid ${(props) => props.theme.color.highlight2};
  border-radius: 10px;
  margin: 0 auto 3rem;
`;

const StyledTextArea = styled.textarea`
  height: 15rem;
  width: 100%;
`;

const Contact = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    const getText = async () => {
      const fetch_url = "/api/text?name=contact";
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
        <title>Audio Engineer | Contact</title>
      </Helmet>
      <PageWrapper>
        <PageHeading>Contact</PageHeading>
        <ContactGuidelinesSection aria-label="Contact Guidelines">
          {text.map((p, i) => (
            <SmallFormattedParagraph key={i}>{p}</SmallFormattedParagraph>
          ))}
        </ContactGuidelinesSection>
        <StyledForm aria-label="Contact Form">
          <InputGroup>
            <InputLabel htmlFor="name">Name:</InputLabel>
            <TextInput type="text" name="name" id="name" />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="email">Email:</InputLabel>
            <TextInput type="email" name="email" id="email" />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="subject">Subject:</InputLabel>
            <TextInput type="text" name="subject" id="subject" />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="message">Message:</InputLabel>
            <StyledTextArea />
          </InputGroup>
          <SubmitButton>Submit</SubmitButton>
        </StyledForm>
      </PageWrapper>
    </PageLayout>
  );
};

export default Contact;
