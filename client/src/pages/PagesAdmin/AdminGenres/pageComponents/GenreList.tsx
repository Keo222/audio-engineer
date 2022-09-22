import React, { useState } from "react";
import styled from "styled-components";

// Types
import type { TGenre } from "types";

// Functions
import { deleteGenre } from "utils/functions/genreCRUD";

// Icons
import { garbageIcon } from "images/icons";

// Styled Components
import { GenreSection } from "../styled";

const ListOfGenres = styled(GenreSection)<{ displayList: boolean }>`
  @media screen and (max-width: 800px) {
    display: ${(props) => (props.displayList ? "initial" : "none")};
  }
`;

const GenreTable = styled.table`
  border-collapse: collapse;
  width: 30rem;
  margin: 0 auto 2rem;
`;

const ColName = styled.col`
  width: stretch;
`;
const ColDelete = styled.col`
  width: 6%;
`;

const TableRow = styled.tr`
  transition: all 0.2s;
  &:hover {
    background: #333;
  }
`;

const TableHeading = styled.th`
  text-align: left;
  font-size: 1.6rem;
  padding: 1rem;
  color: ${(props) => props.theme.color.highlight3};
  cursor: pointer;
  display: flex;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    font-size: 1.4rem;
  }
`;

const HeadingText = styled.p`
  margin-right: 1rem;
`;

const SvgDiv = styled.div`
  display: inline-flex;
  align-self: center;
`;

const SvgIcon = styled.svg`
  width: 1.5em;
  height: 1.5em;
`;

const TableIconHeading = styled.th`
  text-align: left;
  font-size: 1.2rem;
  padding: 1rem;
  color: ${(props) => props.theme.color.textLight};
`;

const TableData = styled.td`
  padding: 1rem;
  font-size: 1.5rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    font-size: 1.2rem;
  }
`;

const TableIcon = styled.td`
  padding: 1rem;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Icon = styled.img`
  height: 5rem;
  width: 3rem;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.6);
  }
`;

type Props = {
  genres: TGenre[];
  displayList: boolean;
};

const GenreList = ({ genres, displayList }: Props) => {
  const [reverseGenres, setReverseGenres] = useState(false);

  const sortedGenres = reverseGenres
    ? genres
        .sort((a, b) =>
          a.genre_name.toLowerCase() > b.genre_name.toLowerCase() ? 1 : -1
        )
        .reverse()
    : genres.sort((a, b) =>
        a.genre_name.toLowerCase() > b.genre_name.toLowerCase() ? 1 : -1
      );

  return (
    <ListOfGenres displayList={displayList} color="3">
      <h3>Genre List</h3>
      <GenreTable>
        <colgroup>
          <ColName />
          <ColDelete />
        </colgroup>
        <thead>
          <TableRow>
            <TableHeading
              onClick={() =>
                setReverseGenres((currReverse) => !currReverse)
              }
            >
              <HeadingText>Genre</HeadingText>
              {reverseGenres ? (
                <SvgDiv>
                  <SvgIcon
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.258 7.758a1.05 1.05 0 0 1 1.484 0l6 6a1.05 1.05 0 1 1-1.484 1.484L12 9.985l-5.258 5.257a1.05 1.05 0 0 1-1.484-1.484l6-6Z"
                      fill="#eee"
                      fillRule="nonzero"
                      className="fill-000000"
                    ></path>
                  </SvgIcon>
                </SvgDiv>
              ) : (
                <SvgDiv>
                  <SvgIcon
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.258 16.242-6-6a1.05 1.05 0 1 1 1.484-1.484L12 14.015l5.258-5.257a1.05 1.05 0 1 1 1.484 1.484l-6 6a1.05 1.05 0 0 1-1.484 0Z"
                      fill="#eee"
                      fillRule="nonzero"
                      className="fill-000000"
                    ></path>
                  </SvgIcon>
                </SvgDiv>
              )}
            </TableHeading>
            <TableIconHeading>Delete</TableIconHeading>
          </TableRow>
        </thead>
        <tbody>
          {sortedGenres &&
            sortedGenres.map((g) => (
              <TableRow key={g.genre_name}>
                <TableData>{g.genre_name}</TableData>
                <TableIcon>
                  <Icon
                    src={garbageIcon}
                    alt="Delete Button"
                    onClick={() => deleteGenre(g.genre_name)}
                  />
                </TableIcon>
              </TableRow>
            ))}
        </tbody>
      </GenreTable>
    </ListOfGenres>
  );
};

export default GenreList;
