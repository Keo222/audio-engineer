import { useState, useEffect } from "react";
import styled from "styled-components";

// Layout
import { MainLayout } from "components/layouts";

// Components
import FlipCard from "components/cards/FlipCard";
import SolidFlipCard from "components/cards/SolidFlipCard";

// Imported Styled Components
import { handleColorType } from "styled/styleHelperFuncs";
import { PageHeading, SmallFormattedParagraph } from "styled/typography";
import { LinkButton } from "styled/buttons";
import { TColorStyle } from "types/StyledTypes";

// Styled Components
const InfoTextDiv = styled.div`
  min-width: 200px;
  width: 60%;
  max-width: 700px;
  border: 2px solid ${(props) => props.theme.color.highlight2};
  border-radius: 10px;
  margin: 0 auto;
`;

const SectionTitle = styled.h3<TColorStyle>`
  color: ${(props) => props.theme.color.textLight};
  font-size: 2.4rem;
  font-weight: 400;
  letter-spacing: 0.5ch;
  margin-bottom: 1.5rem;
  text-decoration: underline 1px ${({ color }) => handleColorType(color)};
`;

const AllCardsDiv = styled.div`
  width: clamp(900px, 80%, 1200px);
  margin: 0 auto;
`;

const FlipCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50rem;
  margin-bottom: 2rem;
`;
const MiddleDiv = styled.div``;

const BestDealText = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2rem;
  margin: 1rem 0 3rem;
  color: ${(props) => props.theme.color.highlight3};
  text-align: center;
`;

const CenteringDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0 8rem;
`;

const Pricing = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    const getText = async () => {
      const fetch_url = "/api/text?name=pricing";
      try {
        const response = await fetch(fetch_url);
        const { stored_text } = await response.json();
        setText(stored_text);
      } catch (err) {
        console.error(err);
      }
    };
    getText();
  }, []);
  return (
    <MainLayout>
      <title>Joel Gardella | Pricing</title>
      <PageHeading>Pricing</PageHeading>
      <InfoTextDiv>
        {text.map((p, i) => (
          <SmallFormattedParagraph key={i}>{p}</SmallFormattedParagraph>
        ))}
      </InfoTextDiv>

      <AllCardsDiv>
        <SectionTitle color={"1"}>Mixing</SectionTitle>
        <FlipCardDiv>
          <FlipCard
            color={"3"}
            cardTitle={"Mix Editing Add-Ons"}
            backText={
              "After 2 weeks in the studio you have all the material recorded, but the music isn’t tight and flowing like you want it to be. Editing includes everything to do with tuning, stitching takes together, timing/quantization and audio repair (e.g. using RX7 to get rid of mouth sounds or fretboard slides). Let me know the track-by-track specifics of what you need help with in the message section of your inquiry for a more accurate quote!"
            }
            work={"Mix"}
          />
          <MiddleDiv>
            <BestDealText>Hire Now</BestDealText>
            <SolidFlipCard color={"1"} numTracks={"12"} work={"Mix"} />
          </MiddleDiv>
          <FlipCard
            color={"3"}
            cardTitle={"LP Deal (7+ tracks)"}
            backText={
              "The magnum opus, the concept album to end all concept albums, or just a larger handful of songs that belong together. Higher track-count projects take a lot of time, love, and care and may end up costing more than the standard rate. Budget at least 2-4 months for the whole process! Test mixes are charged as a single Standard Mix."
            }
            work={"Mix"}
          />
        </FlipCardDiv>

        <SectionTitle color={"2"}>Mastering</SectionTitle>
        <FlipCardDiv>
          <FlipCard
            color={"1"}
            cardTitle={"DDP"}
            backText={
              "Some labels might ask for a DDP file for physical distribution. DDP files contain all the track data needed for CDs (title & artist related info, gaps between tracks etc) and require a specific application to create."
            }
            work={"Master"}
          />
          <MiddleDiv>
            <BestDealText>Hire Now</BestDealText>
            <SolidFlipCard color={"2"} numTracks={"12"} work={"Master"} />
          </MiddleDiv>
          <FlipCard
            color={"1"}
            cardTitle={"Full album master (7+ tracks)"}
            backText={
              "Continuity and flow is crucial for a full album. It takes more work and a higher level of concentration & consistency to put together larger quantities of masters. Prices will be slightly higher and please allow at least 2 weeks turnaround."
            }
            work={"Master"}
          />
        </FlipCardDiv>

        {/* <SectionTitle color={"3"}>Mixing & Mastering</SectionTitle>
        <FlipCardDiv>
          <FlipCard color={"2"} numTracks={"1"} work={"MixMaster"} />
          <MiddleDiv>
            <BestDealText>Hire Now</BestDealText>
            <SolidFlipCard
              color={"3"}
              numTracks={"12"}
              work={"MixMaster"}
            />
          </MiddleDiv>
          <FlipCard color={"2"} numTracks={"5"} work={"MixMaster"} />
        </FlipCardDiv> */}
      </AllCardsDiv>
      <CenteringDiv>
        <LinkButton to="/hire" color={"3"}>
          Book Services
        </LinkButton>
      </CenteringDiv>
    </MainLayout>
  );
};

export default Pricing;
