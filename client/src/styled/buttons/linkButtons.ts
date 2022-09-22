import styled from "styled-components";
import { Link } from "react-router-dom";

// Types
import type { TColorProp } from "styled/types";

// Helper Functions
import { handleColorType } from "../styleHelperFuncs";

// Colored Button Link -- Required props:
// - Color: "1", "2", or "3" for different highlight colors
const LinkButton = styled(Link)<TColorProp>`
  background: ${({ color }) => handleColorType(color)};
  color: ${(props) => props.theme.color.textDark};
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 1px;
  text-decoration: none;
  padding: 1.2rem 2.1rem;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover,
  &:active {
    filter: brightness(0.7);
  }
  @media screen and (${(props) => props.theme.responsive.xs}) {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
  }
`;

const LinkButtonNav = styled(LinkButton)`
  padding: 0.8rem 1.6rem;
`;

export { LinkButton, LinkButtonNav };
