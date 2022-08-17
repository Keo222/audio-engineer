import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Image
import lightbulbWhite from "images/lightbulb-white.png";
// Icon
import { hamburgerIcon, closeIcon } from "images/icons";

// Components
import DropdownNav from "./DropdownNav";

// Styled Components
import { StyledLink, NavLogo, HamburgerOpenIcon } from "styled/navbar";
import { NavLinkButton } from "styled/buttons";

const StyledNav = styled.nav`
  width: 90%;
  max-width: 150rem;
  display: grid;
  grid-template-columns: 1fr 240px 1fr;
  gap: 30px;
  margin: 0 auto;
  font-size: 1.6rem;
  font-weight: 500;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    display: flex;
    height: 15rem;
    width: 95%;
    font-size: 1.6rem;
    font-weight: 500;
    z-index: 100;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    justify-content: space-between;
  } ;
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    gap: 30px;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    display: none;
  } ;
`;

const NavLinksLeft = styled(NavLinksContainer)`
  @media screen and (${(props) => props.theme.responsive.lg}) {
    order: 1;
    margin-left: auto;
  }
`;
const NavLinksRight = styled(NavLinksContainer)`
  @media screen and (${(props) => props.theme.responsive.lg}) {
    order: 2;
  }
`;

const ImageContainer = styled.div`
  width: 12rem;
  height: 15rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    margin: 0 2rem;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 8rem;
    height: 10rem;
  }
`;

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <>
      <StyledNav>
        <NavLinksLeft>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/listen">Listen</StyledLink>
        </NavLinksLeft>
        <ImageContainer>
          <Link to="/">
            <NavLogo src={lightbulbWhite} />
          </Link>
        </ImageContainer>
        <NavLinksRight>
          <StyledLink to="/contact">Contact</StyledLink>
          <StyledLink to="/services">Services</StyledLink>
          <NavLinkButton to="/hire">Hire</NavLinkButton>
        </NavLinksRight>
        <HamburgerOpenIcon
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          src={hamburgerOpen ? closeIcon : hamburgerIcon}
        />
      </StyledNav>
      {hamburgerOpen && (
        <DropdownNav setHamburgerOpen={setHamburgerOpen} />
      )}
    </>
  );
};

export default Navbar;
