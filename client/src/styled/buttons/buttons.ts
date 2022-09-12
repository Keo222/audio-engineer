import styled from "styled-components";

// Types
import type { TColorProp } from "styled/types";
import { handleColorType } from "styled/styleHelperFuncs";

export const NavButton = styled.button<TColorProp>`
  color: ${(props) => props.theme.color.textDark};
  background: ${({ color }) => handleColorType(color)};
  border: none;
  width: fit-content;
  font-family: inherit;
  font-weight: 500;
  font-size: 1.6rem;
  margin: 0;
  text-decoration: none;
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover,
  &:active {
    filter: brightness(0.7);
  }
`;
