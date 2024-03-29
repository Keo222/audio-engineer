import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Images
import logoImg from "images/temp_logo_lightbulb.png";

// Imported Styled Components
import { PageHeading } from "styled/typography";
import { SubmitButton } from "styled/forms";

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

const AdminLogout = () => {
  const { logout } = useAuth0();
  return (
    <FullPageFlex>
      <Helmet>
        <title>JG Admin | Logout</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <ImageContainer>
        <Logo src={logoImg} />
      </ImageContainer>
      <PageHeading>Admin Login</PageHeading>
      <SubmitButton onClick={() => logout()}>Log Out</SubmitButton>
    </FullPageFlex>
  );
};

export default AdminLogout;
