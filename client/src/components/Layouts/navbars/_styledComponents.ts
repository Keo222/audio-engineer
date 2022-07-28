import styled from "styled-components";
import { Link } from "react-router-dom";

const HamburgerIcon = styled.img`
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

const LinkButton = styled(Link)`
  background: ${(props) => props.theme.color.highlight1};
  color: ${(props) => props.theme.color.textDark};
  font-weight: 600;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover,
  &:active {
    filter: brightness(0.7);
  }
`;

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const StyledLink = styled(Link)`
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

export { HamburgerIcon, LinkButton, Logo, StyledLink };
