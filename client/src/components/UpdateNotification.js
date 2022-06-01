import React from "react";
import styled from "styled-components";

// Icons
import checkmark from "../icons/checkmark.svg";

// Styled Components
const UpdateDiv = styled.div`
  position: fixed;
  left: 3rem;
  bottom: 2rem;
  min-width: 80px;
  width: 20vw;
  border: 3px solid #33f425;
  border-radius: 5px;
  background: ${(props) => props.theme.color.background};
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  align-items: center;
`;

const UpdateText = styled.p`
  color: #33f425;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
`;

const SuccessIcon = styled.img`
  height: 2.5rem;
  width: 2.5rem;
`;

const UpdateNotification = () => {
  return (
    <UpdateDiv>
      <UpdateText>Updated!</UpdateText>
      <SuccessIcon src={checkmark} />
    </UpdateDiv>
  );
};

export default UpdateNotification;
