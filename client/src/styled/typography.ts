import styled from "styled-components";
import type { TColorProp } from "styled/types";
import { handleColorType } from "./styleHelperFuncs";

export const PageHeading = styled.h1`
  text-align: center;
  font-size: 4.5rem;
  font-weight: 200;
  color: ${(props) => props.theme.color.highlight2};
  letter-spacing: 1.6rem;
  margin: 3vh 0;

  @media screen and (max-width: 380px) {
    font-size: 3.5rem;
    letter-spacing: 1rem;
  }
`;

export const SectionTitle = styled.h3<TColorProp>`
  color: ${(props) => props.theme.color.textLight};
  font-size: 2.4rem;
  font-weight: 200;
  letter-spacing: 0.5ch;
  text-decoration: underline 1px ${({ color }) => handleColorType(color)};
`;

export const BoldSpan = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.color.highlight3};
`;

export const FormattedParagraph = styled.p`
  color: ${(props) => props.theme.color.textLight};
  font-size: 1.6rem;
  line-height: 2;
  text-indent: 3.5rem;
  margin-bottom: 4rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    font-size: 1.4rem;
  }
`;

export const SmallFormattedParagraph = styled(FormattedParagraph)`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
`;
