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

const SolidCardBackBody = styled.p<{ color: TColor }>`
  display: flex;
  align-items: center;
  flex: 1;

  color: ${(props) => props.theme.color.highlight3};
  text-shadow: 2px 2px 4px ${(props) => props.theme.color.highlight3};
  font-size: 2.7rem;
  letter-spacing: 5px;
  line-height: 2.6;

  margin: 0.8rem auto;
  padding: 0.5rem;

  transform: rotate(-30deg) translate(5px, -15px);
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
        <SolidCardBackBody color={color}>
          12 Track <br /> Discount!
        </SolidCardBackBody>
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
