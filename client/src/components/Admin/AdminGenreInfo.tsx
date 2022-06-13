import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Elements
const TrackInfoDiv = styled.div`
  background: ${(props) => props.theme.color.textDark};
  color: ${(props) => props.theme.color.textLight};
  border: 3px solid ${(props) => props.theme.color.highlight3};
  border-radius: 10px;
`;

const TrackInfoHeader = styled.h3`
  text-align: center;
  padding: 2rem 0;
  text-decoration: underline;
`;

const TrackNum = styled.p`
  text-align: center;
`;

const StyledLink = styled(Link)`
  background: ${(props) => props.theme.color.highlight2};
  color: ${(props) => props.theme.color.textDark};
  font-weight: 600;
  width: fit-content;
  text-decoration: none;
  padding: 0.8rem;
  text-align: center;
  border-radius: 5px;
  transition: all 0.3s;
  margin: 3rem auto 1rem;
  display: block;
  &:hover,
  &:active {
    filter: brightness(0.7);
  }
`;

type Props = {
  numGenres: number,
};

const AdminGenreInfo = ({ numGenres }: Props) => {
  return (
    <TrackInfoDiv>
      <TrackInfoHeader>Genres</TrackInfoHeader>
      <TrackNum>Number of genres: {numGenres}</TrackNum>
      <StyledLink to="/admin/genres">Edit Genres</StyledLink>
    </TrackInfoDiv>
  );
};

export default AdminGenreInfo;
