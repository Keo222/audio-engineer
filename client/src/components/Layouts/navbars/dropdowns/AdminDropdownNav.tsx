import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Elements
const Nav = styled.nav`
  background: ${(props) => props.theme.color.background};
  width: 100%;
  height: calc(100vh - 15rem);
  top: 15rem;
  z-index: 10;
`;

const Links = styled.div`
  width: 100%;
  height: calc(100vh - 40%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.textLight};
  font-size: 1.6rem;

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

type Props = {
  setHamburgerOpen: (val: boolean) => void;
};

const AdminDropdownNav = ({ setHamburgerOpen }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Nav>
      <Links>
        <StyledLink onClick={() => setHamburgerOpen(false)} to="/admin">
          Home
        </StyledLink>
        <StyledLink onClick={() => setHamburgerOpen(false)} to="/admin/tracks">
          Tracks
        </StyledLink>
        <StyledLink onClick={() => setHamburgerOpen(false)} to="/admin/genres">
          Genres
        </StyledLink>
        <StyledLink onClick={() => setHamburgerOpen(false)} to="/admin/text">
          Text
        </StyledLink>
        <StyledLink onClick={() => setHamburgerOpen(false)} to="/">
          Logout
        </StyledLink>
      </Links>
    </Nav>
  );
};

export default AdminDropdownNav;
