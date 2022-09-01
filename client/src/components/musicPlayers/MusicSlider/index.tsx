import { useState, useEffect } from "react";
import styled from "styled-components";

// Arrows
import { leftArrow, rightArrow, upArrow, downArrow } from "images/icons";

// Music Players
import { AppleEmbed, SpotifyEmbed, TidalEmbed } from "../musicEmbeds";

// Types
import type { TPlayer, TTrack } from "types";

import {
  animated,
  useTransition,
  useSpringRef,
  useSpring,
  config,
} from "react-spring";

import { useMeasure } from "react-use";

// SLIDER ELEMENTS
const TopRow = styled.div`
  width: 70%;
  max-width: 110rem;
  display: flex;
  align-items: center;
  margin: 0 auto;
  @media screen and (${(props) => props.theme.responsive.md}) {
    width: 92%;
  }
`;
const TrackAndArrows = styled.div`
  width: 70%;
  max-width: 110rem;
  margin: 0 auto 5rem;
  display: flex;
  align-items: center;
  @media screen and (${(props) => props.theme.responsive.md}) {
    width: 92%;
  }
`;

const NoArrowDiv = styled.div`
  margin-left: 5rem;
`;

const LeftArrowSVG = styled.img`
  height: 3rem;
  margin-right: 2rem;
  cursor: pointer;
  user-select: none;
`;

const RightArrowSVG = styled.img`
  height: 3rem;
  margin-left: 2rem;
  cursor: pointer;
  user-select: none;
`;

const Bumper = styled.div`
  width: 50px;
`;

const TitleContainer = styled.div`
  width: 81rem;
  margin: 0 auto;
`;

const FeaturedTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 300;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.highlight3};
  margin-left: 3rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const GenreTitle = styled.h3`
  font-size: 2rem;
  color: ${(props) => props.theme.color.textLight};
  margin-left: 3rem;
  width: 100%;
`;

// TRACK PLAYER ELEMENT
const TrackContainer = styled.div`
  margin: 0 auto;
  width: 81rem;
`;

// Spotify needs more rounded corners.
// When MusicSlider is rendered on the Listen page,
// rounded is true if spotify is the selected player.
const TrackDiv = styled(animated.div)<{ rounded: boolean }>`
  margin: 0 auto;
  width: 100%;
  background: #eee;
  border-radius: ${(props) => (props.rounded ? "13px" : "5px")};
  overflow: hidden;
`;

const EmbedDiv = styled.div`
  width: 100%;
`;

// Track info elements
const TrackInfoDiv = styled(animated.div)`
  width: 100%;
  margin: 0 auto;
  background: #eee;
`;

const BasicsDiv = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  text-align: center;
`;

const InfoPoint = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  flex-basis: 33%;
  margin: 2.2rem 0;
`;

const TrackInfoToggle = styled.div<{ open: boolean }>`
  width: 100%;
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  align-items: center;
  background: ${(props) => (props.open ? "#ddd" : "#eee")};
`;

const ToggleArrowSVG = styled.img`
  height: 2.2rem;
  margin-left: 5px;
  vertical-align: bottom;
  user-select: none;
`;

type Props = {
  player: TPlayer;
  genre: string;
  tracks: TTrack[];
  rounded: boolean;
};

const MusicSlider = ({ player, genre, tracks, rounded }: Props) => {
  const [current, setCurrent] = useState(0);
  const length = tracks.length;
  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  // Choose which media player is embedded
  const playerSwitch = (track: TTrack) => {
    switch (player) {
      case "Spotify":
        return (
          <SpotifyEmbed
            title={track.track_name}
            source={track.track_spotify}
          />
        );
      case "Apple":
        return (
          <AppleEmbed
            title={track.track_name}
            source={track.track_apple}
          />
        );
      case "Tidal":
        return (
          <TidalEmbed
            title={track.track_name}
            source={track.track_tidal}
          />
        );
      default:
        return (
          <SpotifyEmbed
            title={track.track_name}
            source={track.track_spotify}
          />
        );
    }
  };

  // ANIMATE SLIDER
  const transRef = useSpringRef();
  const transitions = useTransition(current, {
    ref: transRef,
    keys: current,
    from: {
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: {
      opacity: 0,
    },
    config: { duration: 600 },
    exitBeforeEnter: true,
  });

  useEffect(() => {
    transRef.start();
  }, [current, transRef]);

  // ANIMATE INFO DIV
  const [showInfo, setShowInfo] = useState(false);
  const defaultHeight = "0px";
  const [contentHeight, setContentHeight] = useState<number | string>(
    defaultHeight
  );
  const [heightRef, { height }] = useMeasure<HTMLDivElement>();

  // Info Div height toggle animation
  const expand = useSpring({
    config: config.gentle,
    height: showInfo ? `${contentHeight}px` : defaultHeight,
  });

  useEffect(() => {
    //Sets initial height
    setContentHeight(height);

    //Adds resize event listener
    window.addEventListener("resize", setContentHeight(height)!);

    // Clean-up
    return window.removeEventListener("resize", setContentHeight(height)!);
  }, [height]);

  // Move track functions
  const nextTrack = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevTrack = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  // HTML Elements
  return (
    <article aria-label={`${genre} track carousel`}>
      <TopRow>
        <Bumper>&nbsp;</Bumper>
        <TitleContainer>
          {genre === "Featured" ? (
            <FeaturedTitle>{genre}</FeaturedTitle>
          ) : (
            <GenreTitle>{genre}</GenreTitle>
          )}
        </TitleContainer>
        <Bumper>&nbsp;</Bumper>
      </TopRow>
      <TrackAndArrows>
        {tracks.length > 1 ? (
          <LeftArrowSVG
            src={leftArrow}
            onClick={() => prevTrack()}
            role="button"
            title="Previous Track"
          />
        ) : (
          <NoArrowDiv>&nbsp;</NoArrowDiv>
        )}
        {transitions((styles, i) => (
          <TrackContainer>
            <TrackDiv style={styles} rounded={rounded}>
              <EmbedDiv>{playerSwitch(tracks[i])}</EmbedDiv>

              <animated.div style={expand}>
                <TrackInfoDiv ref={heightRef}>
                  <BasicsDiv>
                    <InfoPoint>{tracks[i].track_work}</InfoPoint>
                    <InfoPoint>{tracks[i].track_year}</InfoPoint>
                    <InfoPoint>{tracks[i].track_genre}</InfoPoint>
                  </BasicsDiv>
                </TrackInfoDiv>
              </animated.div>

              {showInfo ? (
                <TrackInfoToggle
                  open={showInfo}
                  onClick={() => setShowInfo(!showInfo)}
                >
                  Close Track Details
                  <ToggleArrowSVG
                    src={upArrow}
                    alt="arrow down to open dropdown"
                  />
                </TrackInfoToggle>
              ) : (
                <TrackInfoToggle
                  open={showInfo}
                  onClick={() => setShowInfo(!showInfo)}
                >
                  See Track Details
                  <ToggleArrowSVG
                    src={downArrow}
                    alt="arrow down to open dropdown"
                  />
                </TrackInfoToggle>
              )}
            </TrackDiv>
          </TrackContainer>
        ))}
        {tracks.length > 1 ? (
          <RightArrowSVG
            src={rightArrow}
            onClick={() => nextTrack()}
            role="button"
            title="Next Track"
          />
        ) : (
          <NoArrowDiv>&nbsp;</NoArrowDiv>
        )}
      </TrackAndArrows>
    </article>
  );
};

export default MusicSlider;
