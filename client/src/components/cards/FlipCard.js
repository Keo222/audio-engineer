import React from "react";

// Imported Styled Components
import {
  Card,
  ColoredCardFront,
  ColoredHeadingFront,
  CardBack,
  CardHeadingBack,
  CardBackBody,
  CardLinkButton,
} from "../../styled/card";

const FlipCard = ({ color, work, cardTitle, backText }) => {
  return (
    <Card>
      <ColoredCardFront color={color}>
        <ColoredHeadingFront>{cardTitle}</ColoredHeadingFront>
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
