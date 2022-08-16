import { Link } from "react-router-dom";
import styled from "styled-components";

// Icons
import { instagramLogo, facebookLogo, mailIcon } from "images/icons";

// Styled Components
const LogosSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 10vh;
`;

const SocialsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const IconDiv = styled.div`
  position: relative;
  cursor: pointer;
  &:hover > span {
    visibility: visible;
    opacity: 1;
  }
`;

const SocialIconDiv = styled(IconDiv)`
  height: 2.7rem;
  width: 2.7rem;
`;

const MailIconDiv = styled(IconDiv)`
  height: 3rem;
  width: 3rem;
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: fit-content;
  background-color: ${(props) => props.theme.color.textDark};
  color: ${(props) => props.theme.color.textLight};
  padding: 5px;
  border: 1px solid #aaa;
  border-radius: 5px;

  /* Tooltip Text */
  white-space: nowrap;
  font-size: 1.2rem;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 30%;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.theme.color.textLight} transparent
      transparent transparent;
  }
`;

const Icon = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  transition: all 0.15s;
  filter: grayscale(20%) brightness(0.8);
  &:hover {
    filter: grayscale(0) brightness(1.3);
  }
`;

type Props = {};

const ContactLogos = (props: Props) => {
  return (
    <LogosSection aria-label="Contact Logo Links">
      <SocialsDiv>
        <SocialIconDiv>
          <Tooltip>Instagram</Tooltip>
          <a
            href="https://www.instagram.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon src={instagramLogo} alt="instagram logo" />
          </a>
        </SocialIconDiv>
        <SocialIconDiv>
          <Tooltip>Facebook</Tooltip>
          <a
            href="https://facebook.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon src={facebookLogo} alt="facebook logo" />
          </a>
        </SocialIconDiv>
        <MailIconDiv>
          <Tooltip>Email Joel</Tooltip>
          <Link to="/contact">
            <Icon src={mailIcon} alt="email icon" />
          </Link>
        </MailIconDiv>
      </SocialsDiv>
    </LogosSection>
  );
};

export default ContactLogos;
