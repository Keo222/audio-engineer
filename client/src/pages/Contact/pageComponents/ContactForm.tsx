import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

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

const ErrorMessage = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.color.highlight3};
`;

const FormikContactForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", subject: "", message: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email required"),
        subject: Yup.string()
          .max(100, "Subject too long")
          .required("Subject required"),
        message: Yup.string().required("Message required"),
      })}
      onSubmit={async ({ name, email, subject, message }, { resetForm }) => {
        const data = {
          name: name,
          email: email,
          subject: subject,
          message: message,
        };

        const res = await fetch("/api/email/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          resetForm();
        } else {
          console.log(res.status, ": ERROR");
        }
      }}
    >
      {(formik) => (
        <StyledForm onSubmit={formik.handleSubmit} aria-label="Contact Form">
          <InputGroup>
            <InputLabel htmlFor="name">Name:</InputLabel>
            <TextInput
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <ErrorMessage>{formik.errors.name}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="email">Email:</InputLabel>
            <TextInput
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="subject">Subject:</InputLabel>
            <TextInput
              type="text"
              name="subject"
              id="subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
            />
            {formik.touched.subject && formik.errors.subject && (
              <ErrorMessage>{formik.errors.subject}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="message">Message:</InputLabel>
            <StyledTextArea
              name="message"
              id="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message && (
              <ErrorMessage>{formik.errors.message}</ErrorMessage>
            )}
          </InputGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default FormikContactForm;
