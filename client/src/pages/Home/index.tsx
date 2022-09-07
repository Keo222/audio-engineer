import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import ContactLogos from "components/ContactLogos";

// Images
import studioImg from "images/studio1.jpg";

// Styled Components
import { PageHeading } from "styled/typography";
import { LinkButtonLg } from "styled/buttons/linkButtons";

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 15rem);
  @media screen and (${(props) => props.theme.responsive.xs}) {
    min-height: calc(100vh - 10rem);
    grid-template-rows: 1.8fr 2fr 1fr 1fr;
  }
`;

const WholeScreenDiv = styled.img`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  object-fit: cover;
  z-index: -5;
  filter: brightness(0.22);
`;

const HomeHeader = styled(PageHeading)`
  margin: 5rem auto 0;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    margin: 1rem auto 0;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    font-size: 4rem;
  }
  @media screen and (${(props) => props.theme.responsive.xs}) {
    font-size: 3rem;
  }
`;

const DescriptorDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  width: 85%;
  @media screen and (${(props) => props.theme.responsive.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    height: 100%;
    gap: 5rem;
  }
  @media screen and (${(props) => props.theme.responsive.xs}) {
    width: 80%;
  }
`;

const DescriptorLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.textLight};
  font-size: 2.4rem;
  font-weight: 200;
  margin: auto;
  transition: color 0.3s;

  &:hover {
    font-weight: 300;
    color: ${(props) => props.theme.color.highlight3};
  }
  @media screen and (${(props) => props.theme.responsive.md}) {
    font-size: 1.8rem;
  }
  @media screen and (${(props) => props.theme.responsive.xs}) {
    font-size: 1.3rem;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 15vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: start;
`;

const Home = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Audio Engineer</title>
        <meta
          name="description"
          content="A site to view an Audio Engineers portfolio and hire them for future work."
        />
      </Helmet>
      <WholeScreenDiv src={studioImg} />
      <HomeSection aria-labelledby="home-header">
        <HomeHeader id="home-header">Audio Engineer</HomeHeader>
        <DescriptorDiv>
          <DescriptorLink to="/about">Audio Engineer</DescriptorLink>
          <DescriptorLink to="/pricing">Production</DescriptorLink>
          <DescriptorLink to="/pricing">
            Mixing &amp; Mastering
          </DescriptorLink>
        </DescriptorDiv>
        <ButtonDiv>
          <LinkButtonLg to="/listen" color={"1"}>
            Listen
          </LinkButtonLg>
          <LinkButtonLg to="/pricing" color={"1"}>
            Services
          </LinkButtonLg>
        </ButtonDiv>
        <ContactLogos />
      </HomeSection>
    </PageLayout>
  );
};

export default Home;
