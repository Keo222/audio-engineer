import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import InfoText from "components/Text/InfoText";

// Styled Elements
import { PageHeading } from "styled/typography";
import HireForm from "./pageComponents/HireForm";

const Hire = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Audio Engineer | Hire</title>
      </Helmet>
      <PageHeading>Hire</PageHeading>
      <InfoText textName="hire" />
      <HireForm />
    </PageLayout>
  );
};

export default Hire;
