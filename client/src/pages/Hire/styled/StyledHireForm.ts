import styled from "styled-components";

import { GridForm, GridSubmitButton } from "styled/forms";
import { handleColorType } from "styled/styleHelperFuncs";
import { TColorProp } from "styled/types";

type TGrid = {
  rowStart?: number;
  rowEnd?: number;
  colStart?: number;
  colEnd?: number;
};

export const HireGridForm = styled(GridForm)`
  margin-top: 6rem;
  transform: translateX(-4ch);
  gap: 14px;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    transform: translateX(0);
  }
`;

export const StyledHireButton = styled(GridSubmitButton)`
  transform: translateX(4ch);
  @media screen and (${(props) => props.theme.responsive.sm}) {
    margin: 0 auto;
    transform: translateX(0);
  }
`;

export const Label = styled.label<TGrid>`
  text-align: right;
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
export const Input = styled.input<TGrid & TColorProp>`
  height: 2rem;
  /* -6px for padding on form elements */
  width: calc(100% - 6px);
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};

  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-row: unset;
    grid-column: unset;
  }
`;

export const StyledSelect = styled.select<TGrid & TColorProp>`
  height: 2.5rem;
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};

  &:focus,
  &:focus-visible {
    outline-color: ${(props) =>
      props.color
        ? handleColorType(props.color)
        : "-webkit-focus-ring-color auto 1px"};
  }

  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-row: unset;
    grid-column: unset;
  }
`;
export const StyledTextArea = styled.textarea<TGrid & TColorProp>`
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};
  height: 15rem;
  /* -5px for padding on form elements */
  width: calc(100% - 5px);

  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-row: unset;
    grid-column: unset;
  }
`;

export const EstimatedCost = styled.p`
  color: ${(props) => props.theme.color.textLight};
  text-align: right;
  font-size: 2.2rem;
  font-weight: 300;
  display: block;
  grid-column-start: 3;
  grid-column-end: -1;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-column: 1 / -1;
    text-align: center;
  }
`;

export const FormGroup = styled.div<TGrid>`
  grid-row-start: ${(props) => props.rowStart};
  grid-row-end: ${(props) => props.rowEnd};
  grid-column-start: ${(props) => props.colStart};
  grid-column-end: ${(props) => props.colEnd};
`;
