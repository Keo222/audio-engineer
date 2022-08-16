import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.textLight};

  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px ${(props) => props.theme.color.highlight1};
    transform: scaleX(0);
    transition: transform 0.25s ease-in-out;
    border-radius: 20px;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

export const NavLogo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

export const HamburgerOpenIcon = styled.img`
  width: 6rem;
  height: 6rem;
  display: none;
  margin-top: 2.5rem;
  margin-right: 2rem;
  cursor: pointer;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    display: block;
  } ;
`;
