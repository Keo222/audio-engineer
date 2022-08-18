import styled from "styled-components";
import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import InfoText from "components/Admin/Text/InfoText";

// Styled Components
import { PageHeading } from "styled/typography";
import { ContactForm } from "./pageComponents";

const PageWrapper = styled.div`
  margin-bottom: 4rem;
`;

const Contact = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Audio Engineer | Contact</title>
      </Helmet>
      <PageWrapper>
        <PageHeading>Contact</PageHeading>
        <InfoText textName="contact" />
        <ContactForm />
      </PageWrapper>
    </PageLayout>
  );
};

export default Contact;
