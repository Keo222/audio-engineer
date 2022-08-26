import styled from "styled-components";

// Types
import { TColor } from "styled/types";

// Styled Components
import {
  Card,
  SolidCardFront,
  SolidHeadingFront,
  SolidCardBack,
  CardHeadingBack,
  CardLinkButton,
} from "./styled";
import { handleColorType } from "styled/styleHelperFuncs";

const SolidCardBackBody = styled.p<{ color: TColor }>`
  color: ${(props) => props.theme.color.textLight};
  width: 75%;
  flex: 1;
  margin: 0.8rem auto;
  padding: 0.5rem;
  border: 2px solid ${({ color }) => handleColorType(color)};
  border-radius: 5px;
`;

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
        <SolidHeadingFront color={color}>
          {numTracks} Tracks
        </SolidHeadingFront>
      </SolidCardFront>
      <SolidCardBack color={color}>
        <CardHeadingBack>
          {numTracks} {trackOrTracks}
        </CardHeadingBack>
        <SolidCardBackBody color={color}></SolidCardBackBody>
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
