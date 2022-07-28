import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Image
import lightbulbWhite from "images/lightbulb-white.png";
// Icon
import hamburger from "icons/hamburger-white.svg";
import closeHamburger from "icons/x-white.svg";

// Components
import { DropdownNav } from "../dropdowns";

// Styled Components
import {
  HamburgerIcon,
  LinkButton,
  Logo,
  StyledLink,
} from "../_styledComponents";

const SmallNav = styled.nav`
  display: none;
  height: 15rem;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  justify-content: space-between;
  z-index: 100;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    display: flex;
  }
  @media screen and (${(props) => props.theme.responsive.xs}) {
    height: 10rem;
  } ;
`;

const LargeNav = styled.nav`
  width: 90%;
  max-width: 150rem;
  margin: 0 auto;
  font-size: 1.6rem;
  font-weight: 500;
  display: grid;
  grid-template-columns: 1fr 240px 1fr;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    display: none;
  } ;
`;

const SmallNavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 50rem;
  margin: 0 4rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    display: none;
  } ;
`;
const NavLinksLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 6rem;
`;
const NavLinksRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 6rem;
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
      <SmallNav>
        <ImageContainer>
          <Link to="/">
            <Logo src={lightbulbWhite} />
          </Link>
        </ImageContainer>
        <SmallNavLinks>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/listen">Listen</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
          <StyledLink to="/pricing">Pricing</StyledLink>
          <LinkButton to="/hire">Hire</LinkButton>
        </SmallNavLinks>
        <HamburgerIcon
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          src={hamburgerOpen ? closeHamburger : hamburger}
        />
      </SmallNav>
      <LargeNav>
        <NavLinksLeft>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/listen">Listen</StyledLink>
        </NavLinksLeft>
        <ImageContainer>
          <Link to="/">
            <Logo src={lightbulbWhite} />
          </Link>
        </ImageContainer>
        <NavLinksRight>
          <StyledLink to="/contact">Contact</StyledLink>
          <StyledLink to="/pricing">Pricing</StyledLink>
          <LinkButton to="/hire">Hire</LinkButton>
        </NavLinksRight>
      </LargeNav>
      {hamburgerOpen && <DropdownNav setHamburgerOpen={setHamburgerOpen} />}
    </>
  );
};

export default Navbar;
