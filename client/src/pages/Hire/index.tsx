import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Layout
import PageLayout from "layouts/PageLayout";

// Components
import InfoText from "components/Admin/Text/InfoText";

// Styled Elements
import { PageHeading, BoldSpan } from "styled/typography";
import { GridForm, GridSubmitButton } from "styled/forms";

interface IGrid {
  rowStart?: number;
  rowEnd?: number;
  colStart?: number;
  colEnd?: number;
}

const Label = styled.label<IGrid>`
  text-align: right;
  margin-right: 1rem;
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};
  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-row: unset;
    grid-column: unset;
  }
  @media screen and (${(props) => props.theme.responsive.xs}) {
    text-align: left;
  }
`;
const Input = styled.input<IGrid>`
  margin-bottom: 2rem;
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};
  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-row: unset;
    grid-column: unset;
  }
`;

const StyledSelect = styled.select<IGrid>`
  height: 2.5rem;
  margin-bottom: 2rem;
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};
  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-row: unset;
    grid-column: unset;
  }
`;
const StyledTextArea = styled.textarea<IGrid>`
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};
  height: 15rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-row: unset;
    grid-column: unset;
  }
`;

const EstimatedCost = styled.p`
  color: ${(props) => props.theme.color.textLight};
  text-align: right;
  font-size: 2.2rem;
  font-weight: 300;
  display: block;
  grid-column-start: 3;
  grid-column-end: -1;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-column: 1 / -1;
  }
`;

const Hire = () => {
  const [numTracks, setNumTracks] = useState(1);
  const [work, setWork] = useState("Mix");

  const handleWorkType = (work: string) => {
    switch (work) {
      case "Mix":
        return "Mix";
      case "Master":
        return "Master";
      case "MixMaster":
        return "Mix/Master";
      default:
        return "Mix";
    }
  };

  useEffect(() => {
    const queries = window.location.search;
    const params = new URLSearchParams(queries);

    const tracksParam = params.get("tracks");
    const workParam = params.get("work");

    if (tracksParam) {
      setNumTracks(parseInt(tracksParam));
    }
    if (workParam) {
      setWork(handleWorkType(workParam));
    }
  }, []);

  return (
    <PageLayout>
      <Helmet>
        <title>Audio Engineer | Hire</title>
      </Helmet>
      <PageHeading>Hire</PageHeading>
      <InfoText textName="hire" />
      <GridForm aria-label="Hire Form">
        <Label htmlFor="name">Name:</Label>
        <Input type="text" name="name" id="name" />
        <Label rowStart={1} rowEnd={2} colStart={3} htmlFor="work">
          Work:
        </Label>
        <StyledSelect
          name="work"
          id="work"
          rowStart={1}
          rowEnd={2}
          colStart={4}
          value={work}
          onChange={(e) => setWork(e.target.value)}
        >
          <option value="Mix">Mix</option>
          <option value="Mix + Edit">Mix + Edit</option>
          <option value="Master">Master</option>
          <option value="Mix & Master">Mix & Master</option>
          <option value="Produce">Produce</option>
        </StyledSelect>
        <Label rowStart={2} rowEnd={3} colStart={3} htmlFor="numSongs">
          Tracks:
        </Label>
        <StyledSelect
          name="numSongs"
          id="numSongs"
          rowStart={2}
          rowEnd={3}
          colStart={4}
          value={numTracks}
          onChange={(e) => setNumTracks(parseInt(e.target.value))}
        >
          {Array.from(Array(12).keys()).map((n) => (
            <option value={n + 1}>{n + 1}</option>
          ))}
        </StyledSelect>
        <Label htmlFor="email">Email:</Label>
        <Input type="email" name="email" id="email" />
        <Label htmlFor="subject" rowStart={3}>
          Subject:
        </Label>
        <Input
          colStart={2}
          colEnd={-1}
          type="text"
          name="subject"
          id="subject"
        />
        <Label htmlFor="message">Message:</Label>
        <StyledTextArea colStart={2} colEnd={-1} />
        <EstimatedCost>
          <BoldSpan>Estimate:</BoldSpan> ${numTracks * 10000}.00
        </EstimatedCost>
        <GridSubmitButton>Submit</GridSubmitButton>
      </GridForm>
    </PageLayout>
  );
};

export default Hire;
