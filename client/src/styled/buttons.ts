import styled from "styled-components";
import { Link } from "react-router-dom";

// Types
import { TColorStyle } from "../types/StyledTypes";

// Helper Functions
import { handleColorType } from "./styleHelperFuncs";

// Colored Button Link -- Required props:
// - Color: "1", "2", or "3" for different highlight colors
export const LinkButton = styled(Link)<TColorStyle>`
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
