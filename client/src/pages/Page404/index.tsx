import styled from "styled-components";

// Layout
import PageLayout from "layouts/PageLayout";

// Styled Components
import { LinkButton } from "styled/buttons";

const InnerFlex = styled.div`
  width: 90%;
  margin: 0 auto;
  min-height: calc(85vh - 15rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 15vh;
  }
  @media screen and (max-width: 450px) {
    min-height: calc(92vh - 15rem);
    &:last-child {
      margin-bottom: 8vh;
    }
  }
`;

const Header404 = styled.h1`
  font-family: "Space Mono", monospace;
  font-size: 112px;
  font-style: italic;
  margin-top: 5rem;
  margin-bottom: 0;
  color: ${(props) => props.theme.color.highlight3};
  text-align: center;
  @media screen and (max-width: 450px) {
    margin-top: 0;
  }
`;

const Para404 = styled.p`
  color: ${(props) => props.theme.color.textLight};
  text-align: center;
  font-size: 20px;
`;

const LinkButton404 = styled(LinkButton)`
  width: fit-content;
  margin: 0 auto;
`;

const Page404 = () => {
  return (
    <PageLayout>
      <InnerFlex>
        <Header404>404</Header404>
        <Para404>Page not found. Please return to safety.</Para404>
        <LinkButton404 to="/" color="1">
          Home
        </LinkButton404>
      </InnerFlex>
    </PageLayout>
  );
};

export default Page404;
