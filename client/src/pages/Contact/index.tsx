import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import InfoText from "components/Admin/Text/InfoText";

// Styled Components
import { PageHeading } from "styled/typography";
import { ContactForm } from "./pageComponents";

const Contact = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Audio Engineer | Contact</title>
        <meta
          name="description"
          content="Contact Audio Engineer for all mixing, mastering, and producing inquiries."
        />
      </Helmet>
      <PageHeading>Contact</PageHeading>
      <InfoText textName="contact" />
      <ContactForm />
    </PageLayout>
  );
};

export default Contact;
