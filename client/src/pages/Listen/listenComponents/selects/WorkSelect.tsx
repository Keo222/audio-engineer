import React from "react";
import styled from "styled-components";
import type { TSelectable } from "styled/types";
import { TWork } from "types";

// Styled Components
const WorkSelectContainer = styled.div<TSelectable>`
  font-size: 1.4rem;
  font-weight: 600;
  height: 9rem;
  width: 30%;
  background: ${(props) => (props.selected ? "#404040" : "#606060")};
  border-radius: 55px;
  overflow: hidden;
`;
const WorkTrio = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 12%;
  border: 1px solid ${(props) => props.theme.color.textDark};
  overflow: hidden;
  box-shadow: 5px 0px 20px rgba(0, 0, 0, 0.4);
`;
const TrioItem = styled.div`
  display: flex;
  height: 6rem;
  align-items: center;
  justify-content: center;
  flex: 1;
  outline: 1px solid ${(props) => props.theme.color.textDark};
  filter: initial;
  transition: all 0.15s;
  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
  }
`;
const ProductionTrioItem = styled(TrioItem)<TSelectable>`
  background: ${(props) =>
    props.selected
      ? props.theme.color.highlight1
      : props.theme.color.textLight};
`;
const MixingTrioItem = styled(TrioItem)<TSelectable>`
  background: ${(props) =>
    props.selected
      ? props.theme.color.highlight2
      : props.theme.color.textLight};
`;
const MasteringTrioItem = styled(TrioItem)<TSelectable>`
  background: ${(props) =>
    props.selected
      ? props.theme.color.highlight3
      : props.theme.color.textLight};
`;

const AllWorkSelect = styled.div<TSelectable>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.selected
      ? props.theme.color.highlight1
      : props.theme.color.textLight};
  height: 3rem;
  transition: all 0.15s;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.color.highlight1};
  }
`;

type Props = {
  work: TWork;
  setWork: React.Dispatch<React.SetStateAction<TWork>>;
};

const WorkSelect = ({ work, setWork }: Props) => {
  return (
    <WorkSelectContainer selected={work === "All"}>
      <WorkTrio>
        <ProductionTrioItem
          onClick={() => setWork("Production")}
          selected={work === "Production"}
        >
          Production
        </ProductionTrioItem>
        <MixingTrioItem
          onClick={() => setWork("Mixing")}
          selected={work === "Mixing"}
        >
          Mixing
        </MixingTrioItem>
        <MasteringTrioItem
          onClick={() => setWork("Mastering")}
          selected={work === "Mastering"}
        >
          Mastering
        </MasteringTrioItem>
      </WorkTrio>
      <AllWorkSelect
        onClick={() => setWork("All")}
        selected={work === "All"}
      >
        All
      </AllWorkSelect>
    </WorkSelectContainer>
  );
};

export default WorkSelect;
