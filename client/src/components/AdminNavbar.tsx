import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Components
import AdminDropdownNav from "./AdminDropdownNav";

// Image
import lightbulbWhite from "images/lightbulb-white.png";
// Icon
import { hamburgerIcon, closeIcon } from "images/icons";

// Styled Components
import { StyledLink, NavLogo, HamburgerOpenIcon } from "styled/navbar";
import { NavLinkButton } from "styled/buttons";

const AdminNav = styled.nav`
  width: 90%;
  max-width: 150rem;
  margin: 0 auto;
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

const AdminImageContainer = styled.div`
  width: 12rem;
  height: 15rem;
  margin: 0 2rem;
  display: flex;
  align-items: center;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 8rem;
    height: 10rem;
  }
`;

const AdminNavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 30vw;
  margin: 0 4rem;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    min-width: 50vw;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    display: none;
  } ;
`;

// const AdminLinkButton = styled(LinkButton)`
//   padding: 0.6rem 1.1rem;
//   font-weight: inherit;
//   font-size: 1.4rem;
// `;

const AdminNavbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  return (
    <>
      <AdminNav>
        <AdminImageContainer>
          <Link to="/">
            <NavLogo src={lightbulbWhite} />
          </Link>
        </AdminImageContainer>
        <AdminNavLinks>
          <StyledLink to="/admin/">Home</StyledLink>
          <StyledLink to="/admin/tracks">Tracks</StyledLink>
          <StyledLink to="/admin/genres">Genres</StyledLink>
          <StyledLink to="/admin/text">Text</StyledLink>
          <NavLinkButton to="/">Main Site</NavLinkButton>
        </AdminNavLinks>
        <HamburgerOpenIcon
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          src={hamburgerOpen ? closeIcon : hamburgerIcon}
        />
      </AdminNav>
      {hamburgerOpen && (
        <AdminDropdownNav setHamburgerOpen={setHamburgerOpen} />
      )}
    </>
  );
};

export default AdminNavbar;
