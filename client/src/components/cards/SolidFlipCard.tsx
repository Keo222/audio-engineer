// Types
import { TColor } from "types/StyledTypes";

// Imported Styled Components
import {
  Card,
  SolidCardFront,
  SolidHeadingFront,
  SolidCardBack,
  CardHeadingBack,
  CardBackBody,
  CardLinkButton,
} from "styled/card";

type Props = {
  color: TColor;
  numTracks: string;
  work: string;
};
const SolidFlipCard = ({ color, numTracks, work }: Props) => {
  const trackOrTracks = numTracks === "1" ? "Track" : "Tracks";
  return (
    <Card>
      <SolidCardFront color={color}>
        <SolidHeadingFront color={color}>{numTracks} Tracks</SolidHeadingFront>
      </SolidCardFront>
      <SolidCardBack color={color}>
        <CardHeadingBack>
          {numTracks} {trackOrTracks}
        </CardHeadingBack>
        <CardBackBody color={color}>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
          <li>Four</li>
          <li>Five</li>
          <li>Six</li>
          <li>Seven</li>
          <li>Eight</li>
          <li>Nine</li>
          <li>Ten</li>
          <li>Eleven</li>
          <li>Twelve</li>
          <li>Thirteen</li>
          <li>Fourteen</li>
          <li>Fifteen</li>
        </CardBackBody>
        <CardLinkButton
          to={`/hire?tracks=${numTracks}&work=${work}`}
          color={color}
        >
          Inquire
        </CardLinkButton>
      </SolidCardBack>
    </Card>
  );
};

export default SolidFlipCard;
