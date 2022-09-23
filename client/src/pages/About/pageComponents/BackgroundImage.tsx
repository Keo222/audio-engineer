import styled from "styled-components";

// Images
import aboutImgSrc from "images/temp_about.jpg";

// Styled Components
const AboutImg = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -5;
  object-fit: cover;
  width: 40vw;
  height: 100vh;
  filter: brightness(0.5) grayscale(0.2);
  @media screen and (${(props) => props.theme.responsive.lg}) {
    width: 80vw;
    filter: brightness(0.25) grayscale(0.6);
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 100vw;
    filter: brightness(0.22) grayscale(0.3);
  }
`;

const ImgOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -4;
  width: 40vw;
  height: 100vh;
  background: linear-gradient(
      to right,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to bottom right,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 50%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to bottom,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to bottom left,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to left,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to top left,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to top,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    ),
    linear-gradient(
      to top right,
      rgba(16, 12, 11, 0),
      rgba(16, 12, 11, 0) 70%,
      rgba(16, 12, 11, 1)
    );
  @media screen and (${(props) => props.theme.responsive.lg}) {
    width: 80vw;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    width: 100vw;
  }
`;

const BackgroundImage = () => {
  return (
    <>
      <ImgOverlay />
      <AboutImg src={aboutImgSrc} />
    </>
  );
};

export default BackgroundImage;
