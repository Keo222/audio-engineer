import styled from "styled-components";

// Styled Components
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SubmitButton,
} from "styled/forms";

const StyledTextArea = styled.textarea`
  height: 15rem;
  width: 100%;
`;

const ContactForm = () => {
  return (
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
  );
};

export default ContactForm;
