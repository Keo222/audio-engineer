import styled from "styled-components";

// Types
import { TColorProp } from "styled/types";

// Funcs
import { handleColorType } from "styled/styleHelperFuncs";

export const GenreSection = styled.section<TColorProp>`
  width: 42%;
  height: fit-content;
  border: 2px solid ${({ color }) => handleColorType(color)};
  border-radius: 10px;
  & h3 {
    text-align: center;
    font-size: 1.8rem;
    color: ${({ color }) => handleColorType(color)};
  }
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;
