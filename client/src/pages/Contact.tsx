import { useState, useEffect } from "react";
import styled from "styled-components";

// Layout
import { MainLayout } from "components/layouts";

// Imported Styled Components
import { PageHeading, SmallFormattedParagraph } from "styled/typography";
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SubmitButton,
} from "styled/forms";

// Styled Components
const PageWrapper = styled.div`
  margin-bottom: 4rem;
`;
const ContactInfoTextDiv = styled.div`
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
    <MainLayout>
      <PageWrapper>
        <title>Joel Gardella | Contact</title>
        <PageHeading>Contact</PageHeading>
        <ContactInfoTextDiv>
          {text.map((p, i) => (
            <SmallFormattedParagraph key={i}>{p}</SmallFormattedParagraph>
          ))}
        </ContactInfoTextDiv>
        <StyledForm>
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
    </MainLayout>
  );
};

export default Contact;
