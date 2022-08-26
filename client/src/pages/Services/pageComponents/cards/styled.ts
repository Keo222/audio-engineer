import styled from "styled-components";

import { LinkButton } from "../../../../styled/buttons/linkButtons";

// Helper Functions
import {
  handleColorType,
  handleGlowType,
} from "../../../../styled/styleHelperFuncs";

// Types
import type { TColorProp } from "styled/types";

// Styled Components
export const Card = styled.div`
  perspective: 150rem;
  -moz-perspective: 150rem;
  position: relative;
  height: 30rem;
  width: 25rem;

  &:hover div:nth-of-type(1) {
    transform: rotateY(-180deg);
  }
  &:hover div:nth-of-type(2) {
    transform: rotateY(0deg);
  }
`;

const CardSide = styled.div`
  font-size: 2rem;
  text-align: center;
  height: 35rem;
  transition: all 0.8s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  backface-visibility: hidden;
  border-radius: 3px;
  box-shadow: 0 1.5rem 4rem rgba(255, 255, 255, 0.4);
  overflow: hidden;
`;

const SolidCardSide = styled(CardSide)<TColorProp>`
  box-shadow: 0 0 5rem 1rem ${({ color }) => handleGlowType(color)};
`;

export const ColoredCardFront = styled(CardSide)<TColorProp>`
  background-image: linear-gradient(
    to bottom,
    #eee,
    ${({ color }) => handleColorType(color)} 50%,
    ${({ color }) => handleColorType(color)}
  );
`;

export const SolidCardFront = styled(SolidCardSide)`
  background: ${(props) => props.theme.color.textDark};
`;

const CardHeading = styled.h4`
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.8rem;
`;

export const ColoredHeadingFront = styled(CardHeading)`
  color: ${(props) => props.theme.color.textDark};
`;

export const SolidHeadingFront = styled(CardHeading)<TColorProp>`
  color: ${({ color }) => handleColorType(color)};
  letter-spacing: unset;
`;

// CARD BACK
export const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  background-color: ${(props) => props.theme.color.textDark};
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SolidCardBack = styled(SolidCardSide)`
  transform: rotateY(180deg);
  background-color: ${(props) => props.theme.color.textDark};
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardHeadingBack = styled(CardHeading)`
  color: ${(props) => props.theme.color.textLight};
  font-weight: 300;
  margin: auto 0;
`;

export const CardBackBody = styled.ul<TColorProp>`
  color: ${(props) => props.theme.color.textLight};
  width: 75%;
  flex: 1;
  list-style-position: inside;
  margin: 0.8rem auto;
  padding: 0.5rem;
  border: 2px solid ${({ color }) => handleColorType(color)};
  border-radius: 5px;
  overflow-y: hidden;
  text-align: left;
  font-size: 1.4rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.background};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ color }) => handleColorType(color)};
    border-radius: 10px;
  }

  &:hover {
    overflow-y: scroll;
  }
`;

export const CardLinkButton = styled(LinkButton)`
  margin: 0 auto;
  width: fit-content;
  block-size: fit-content;
  padding: 0.8rem 1.5rem;
`;
