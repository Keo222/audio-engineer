import React from "react";
import styled from "styled-components";

// Images
import logoImg from "../../images/lightbulb-white.png";

// Imported Styled Components
import { PageHeading } from "../../styled/typography";
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SubmitButton,
} from "../../styled/forms";

const FullPageFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 800px;
  height: 100vh;
`;

const ImageContainer = styled.div`
  width: 12rem;
  height: 15rem;
  margin: 3rem 5rem;
  display: flex;
  align-items: center;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 8rem;
    height: 10rem;
  }
`;

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const AdminLogin = () => {
  return (
    <FullPageFlex>
      <ImageContainer>
        <Logo src={logoImg} />
      </ImageContainer>
      <PageHeading>Admin Login</PageHeading>
      <StyledForm>
        <InputGroup>
          <InputLabel htmlFor="username">Username:</InputLabel>
          <TextInput
            placeholder="Username..."
            name="username"
            id="username"
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="password">Password:</InputLabel>
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Password..."
          />
        </InputGroup>
        <SubmitButton>Login</SubmitButton>
      </StyledForm>
    </FullPageFlex>
  );
};

export default AdminLogin;
