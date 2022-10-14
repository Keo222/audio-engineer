import styled from "styled-components";

// Helper Functions
import { handleColorType } from "./styleHelperFuncs";

// Types
import type { TColorProp } from "styled/types";

export const StyledForm = styled.form`
  color: ${(props) => props.theme.color.textLight};
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  width: clamp(250px, 80%, 600px);
  margin: 3rem auto;
`;

export const GridForm = styled.form`
  min-width: 500px;
  width: 60%;
  max-width: 900px;
  margin: 5rem auto;
  display: grid;
  grid-template-columns: 10ch 2fr 1fr 1fr;
  color: ${(props) => props.theme.color.textLight};
  font-size: 1.6rem;
  line-height: 2.5rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    grid-template-columns: 10ch 1fr;
    min-width: 90vw;
  }
  @media screen and (${(props) => props.theme.responsive.xs}) {
    display: flex;
    flex-direction: column;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

export const InputLabel = styled.label`
  margin-right: 2rem;
`;

export const TextInput = styled.input`
  width: 100%;
`;

export const SelectDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const RadioDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: clamp(200px, 80%, 250px);
  justify-content: space-between;
`;

export const RadioGroup = styled.div``;

export const SubmitButton = styled.button<TColorProp>`
  color: ${(props) => props.theme.color.textDark};
  background: ${({ color }) => handleColorType(color)};
  border: none;
  width: fit-content;
  font-family: inherit;
  font-weight: 500;
  font-size: 1.6rem;
  margin: 3rem auto;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover,
  &:active {
    filter: brightness(0.7);
  }
`;

export const GridSubmitButton = styled(SubmitButton)`
  grid-column: 1 / -1;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${(props) => props.theme.color.highlight3};
`;
