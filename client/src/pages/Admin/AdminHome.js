import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Components
import AdminTrackInfo from "../../components/AdminTrackInfo";
import AdminGenreInfo from "../../components/AdminGenreInfo";
import AdminTextInfo from "../../components/AdminTextInfo";

// Imported Styled Elements
import { PageHeading } from "../../styled/typography";

// Styled Elements
const AdminHomeDiv = styled.div`
  color: ${(props) => props.theme.color.textLight};
  font-size: 1.4rem;
  width: 70%;
  margin: 0 auto 5rem;
  @media screen and (${(props) => props.theme.responsive.md}) {
    width: 90%;
  }
`;

const AdminHomeHeading = styled(PageHeading)`
  grid-column: span 2;
`;

const EditAdminDiv = styled.div`
  height: calc(100vh - 20rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 4fr 4fr;
  gap: 2rem;
  margin-bottom: 5rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    gap: 1rem;
  } ;
`;

const Admin = () => {
  const [numTracks, setNumTracks] = useState(0);
  const [numGenres, setNumGenres] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const getNumTracks = async () => {
    const response = await fetch("/api/tracks");
    const allTracks = await response.json();
    setNumTracks(allTracks.length);
  };

  useEffect(() => {
    getNumTracks();
  }, []);

  const getNumGenres = async () => {
    const response = await fetch("/api/genres");
    const allGenres = await response.json();
    setNumGenres(allGenres.length);
  };

  useEffect(() => {
    getNumGenres();
  }, []);

  useEffect(() => {
    const getText = async () => {
      const fetch_url = "/api/text?name=all";
      try {
        const response = await fetch(fetch_url);
        const texts = await response.json();
        // About Text
        const aboutTextLength = texts
          .find((t) => t.name === "about")
          .stored_text.join(" ")
          .split(" ").length;
        // Contact Text
        const contactTextLength = texts
          .find((t) => t.name === "contact")
          .stored_text.join(" ")
          .split(" ").length;
        // Pricing Text
        const pricingTextLength = texts
          .find((t) => t.name === "pricing")
          .stored_text.join(" ")
          .split(" ").length;
        // Hire Text
        const hireTextLength = texts
          .find((t) => t.name === "hire")
          .stored_text.join(" ")
          .split(" ").length;

        const totalLength =
          aboutTextLength +
          contactTextLength +
          pricingTextLength +
          hireTextLength;

        setWordCount(totalLength);
      } catch (err) {
        console.error(err);
      }
    };
    getText();
  }, []);

  return (
    <>
      <title>JG Admin</title>
      <AdminHomeDiv>
        <EditAdminDiv>
          <AdminHomeHeading>Admin Home</AdminHomeHeading>
          <AdminGenreInfo numGenres={numGenres} />
          <AdminTextInfo wordCount={wordCount} />
          <AdminTrackInfo numTracks={numTracks} />
        </EditAdminDiv>
      </AdminHomeDiv>
    </>
  );
};

export default Admin;
