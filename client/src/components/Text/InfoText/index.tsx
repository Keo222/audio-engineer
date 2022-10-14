import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

// Functions
import { getText } from "utils/functions/textCRUD";
import { textAria } from "utils/functions/textFuncs";
// Types
import { TText, TInfoTextTitle } from "types";

// Styled Components
import { SmallFormattedParagraph } from "styled/typography";

const InfoTextSection = styled.section`
  min-width: 200px;
  width: clamp(350px, 70%, 750px);
  border: 2px solid ${(props) => props.theme.color.highlight2};
  border-radius: 10px;
  margin: 0 auto;

  @media screen and (max-width: 475px) {
    width: 90vw;
  } ;
`;

// Props Type
type Props = {
  textName: TInfoTextTitle;
};

// Functional Component
const InfoText = ({ textName }: Props) => {
  const [textArray, setTextArray] = useState<TText["stored_text"]>();

  // Memoized Fetch for Text Array Saved to State
  const fetchText = useCallback(async () => {
    const allText = await getText(textName);
    if (Array.isArray(allText)) {
      setTextArray(allText);
    }
  }, [textName]);

  // Fetch Text Array on Page Load
  useEffect(() => {
    fetchText();
  }, [fetchText]);

  return (
    <InfoTextSection aria-label={`${textAria(textName)} Guidelines}`}>
      {textArray?.map((p, i) => (
        <SmallFormattedParagraph key={i}>{p}</SmallFormattedParagraph>
      ))}
    </InfoTextSection>
  );
};

export default InfoText;
