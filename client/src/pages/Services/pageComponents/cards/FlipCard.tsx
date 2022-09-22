import { useState } from "react";
import styled from "styled-components";
import { handleColorType } from "styled/styleHelperFuncs";
// Types
import type { TColor, TColorProp } from "styled/types";

// Imported Styled Components
import {
  Card,
  ColoredCardFront,
  ColoredHeadingFront,
  CardBack,
  CardHeadingBack,
  CardBackBody,
  CardLinkButton,
} from "./styled";

const CardButton = styled.button<Required<TColorProp>>`
  display: none;
  background-color: ${(props) => props.theme.color.textDark};
  color: ${(props) => handleColorType(props.color)};
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 1px;
  padding: 1.2rem 2.1rem;
  margin: 2rem auto;
  width: fit-content;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    display: block;
  }
`;

type Props = {
  color: TColor;
  work: string;
  cardTitle: string;
  backText: string;
};

const FlipCard = ({ color, work, cardTitle, backText }: Props) => {
  const [flip, setFlip] = useState(false);
  return (
    <Card flip={flip}>
      <ColoredCardFront aria-hidden="true" color={color}>
        <ColoredHeadingFront>{cardTitle}</ColoredHeadingFront>
        <CardButton color={color} onClick={() => setFlip(true)}>
          Details
        </CardButton>
      </ColoredCardFront>
      <CardBack>
        <CardHeadingBack>{cardTitle}</CardHeadingBack>
        <CardBackBody color={color}>{backText}</CardBackBody>
        <CardLinkButton to={`/hire?work=${work}`} color={color}>
          Inquire
        </CardLinkButton>
      </CardBack>
    </Card>
  );
};

export default FlipCard;
