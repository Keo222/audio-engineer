import { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Helper Functions
import { deleteTrack, getTracks } from "utils/functions";

// Types
import type { TTrack } from "types";

// Layout
import AdminLayout from "layouts/AdminLayout";

// Icons
import { garbageIcon, editIcon } from "images/icons";

// Components
import DeleteTrackPopup from "components/Admin/DeleteTrackPopup";

// Imported Styled Elements
import { PageHeading } from "styled/typography";

// Styled Elements

const AdminTracksDiv = styled.div`
  color: ${(props) => props.theme.color.textLight};
  font-size: 1.4rem;
  width: 80%;
  margin: 2rem auto;
  @media screen and (${(props) => props.theme.responsive.md}) {
    width: 100vw;
  }
`;

const NewTrackButton = styled(Link)`
  color: ${(props) => props.theme.color.textDark};
  background: ${(props) => props.theme.color.highlight3};
  display: block;
  width: 7.3rem;
  text-align: center;
  margin-left: auto;
  margin-bottom: 4rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover,
  &:active {
    filter: brightness(0.7);
  }

  @media screen and (${(props) => props.theme.responsive.md}) {
    margin: 0 5rem 3rem auto;
  }
  @media screen and (${(props) => props.theme.responsive.sm}) {
    font-size: 1.2rem;
    width: 6.4rem;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  max-width: 90%;
  margin: 0 auto 8rem;
  @media screen and (${(props) => props.theme.responsive.md}) {
    width: 95%;
    margin: 0 auto 4rem;
  }
`;

const ColNum = styled.col`
  width: 7%;
`;
const ColName = styled.col`
  width: 18%;
`;
const ColAlbum = styled.col`
  width: 16%;
  @media screen and (${(props) => props.theme.responsive.md}) {
    display: none;
  }
`;
const ColArtist = styled.col`
  width: 16%;
`;
const ColGenre = styled.col`
  width: 16%;
  @media screen and (${(props) => props.theme.responsive.md}) {
    display: none;
  }
`;
const ColYear = styled.col`
  width: 15%;
  @media screen and (${(props) => props.theme.responsive.md}) {
    display: none;
  }
`;
const ColEdit = styled.col`
  width: 6%;
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

const TableHeading = styled.th<{ selected: boolean }>`
  text-align: left;
  font-size: 1.8rem;
  padding: 1rem;
  color: ${(props) =>
    props.selected
      ? props.theme.color.highlight3
      : props.theme.color.highlight1};
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    font-size: 1.4rem;
  }
`;

const TableHeadingLgScreen = styled(TableHeading)`
  @media screen and (${(props) => props.theme.responsive.md}) {
    display: none;
  }
`;
const TableIconHeading = styled.th`
  text-align: left;
  font-size: 1.2rem;
  padding: 1rem;
  color: ${(props) => props.theme.color.highlight1};
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TableData = styled.td`
  padding: 1rem;
  @media screen and (${(props) => props.theme.responsive.sm}) {
    font-size: 1.2rem;
  }
`;

const TableDataLgScreen = styled(TableData)`
  @media screen and (${(props) => props.theme.responsive.md}) {
    display: none;
  }
`;

const TableIcon = styled.td`
  padding: 1rem;
  align-items: center;
`;

const Icon = styled.img`
  height: 5rem;
  width: 3rem;
  cursor: pointer;
  transition: filter 0.2s;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    filter: brightness(0.6);
  }
`;

type SortByType = "num" | "name" | "album" | "artist" | "genre" | "year";

const AdminTracks = () => {
  // STATE HANDLERS
  const [tracks, setTracks] = useState([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteTrackInfo, setDeleteTrackInfo] = useState<TTrack | null>(null);
  const [popupOpen, togglePopup] = useReducer((popupOpen) => !popupOpen, false);
  const [sortBy, setSortBy] = useState<SortByType>("num");
  const [reverse, setReverse] = useState(false);

  const sortSwitch = (sortBy: SortByType) => {
    switch (sortBy) {
      case "num":
        return tracks.sort((a: TTrack, b: TTrack) =>
          a.track_id > b.track_id ? 1 : -1
        );
      case "name":
        return tracks.sort((a: TTrack, b: TTrack) =>
          a.track_name > b.track_name ? 1 : -1
        );
      case "album":
        return tracks.sort((a: TTrack, b: TTrack) =>
          a.track_album > b.track_album ? 1 : -1
        );
      case "artist":
        return tracks.sort((a: TTrack, b: TTrack) =>
          a.track_artist > b.track_artist ? 1 : -1
        );
      case "genre":
        return tracks.sort((a: TTrack, b: TTrack) =>
          a.track_genre > b.track_genre ? 1 : -1
        );
      case "year":
        return tracks.sort((a: TTrack, b: TTrack) =>
          a.track_year > b.track_year ? 1 : -1
        );
      default:
        return tracks.sort((a: TTrack, b: TTrack) =>
          a.track_id > b.track_id ? 1 : -1
        );
    }
  };

  const sortedTracks = reverse
    ? sortSwitch(sortBy).reverse()
    : sortSwitch(sortBy);

  const organizeTracks = (sortElem: SortByType) => {
    if (sortElem === sortBy) {
      setReverse((r) => !r);
    } else {
      setReverse(false);
      setSortBy(sortElem);
    }
  };

  // Get tracks and sort them by track id. Give them order number and then set to tracks state
  const fetchTracks = async () => {
    const allTracks = await getTracks();
    const sortedAndNumberedTracks = allTracks
      .sort((a: TTrack, b: TTrack) => (a.track_id > b.track_id ? 1 : -1))
      .map((t: TTrack, i: number) => ({ ...t, numOrder: i + 1 }));
    setTracks(sortedAndNumberedTracks);
  };

  const openDeletePopup = (id: number) => {
    setDeleteId(id);
    togglePopup();
  };

  const removeTrack = async () => {
    if (deleteId !== null) {
      const res = await deleteTrack(deleteId);
      if (res?.ok) {
        fetchTracks();
      } else {
        console.error("Error deleting track.");
      }
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  useEffect(() => {
    if (tracks && deleteId) {
      const info = tracks.filter((t: TTrack) => t.track_id === deleteId);
      setDeleteTrackInfo(info[0] || {});
    }
  }, [deleteId, tracks]);
  return (
    <AdminLayout>
      <Helmet>
        <title>JG Admin | Tracks</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      {popupOpen && deleteTrackInfo && (
        <DeleteTrackPopup
          togglePopup={togglePopup}
          removeTrack={removeTrack}
          name={deleteTrackInfo.track_name}
          artist={deleteTrackInfo.track_artist}
        />
      )}
      <AdminTracksDiv>
        <PageHeading>Tracks</PageHeading>
        <NewTrackButton to="/admin/tracks/new">Add Track</NewTrackButton>
        <Table>
          <colgroup>
            <ColNum />
            <ColName />
            <ColAlbum />
            <ColArtist />
            <ColGenre />
            <ColYear />
            <ColEdit />
            <ColDelete />
          </colgroup>
          <thead>
            <TableRow>
              <TableHeading
                selected={sortBy === "num"}
                onClick={() => organizeTracks("num")}
              >
                #
              </TableHeading>
              <TableHeading
                selected={sortBy === "name"}
                onClick={() => organizeTracks("name")}
              >
                Track Name
              </TableHeading>
              <TableHeadingLgScreen
                selected={sortBy === "album"}
                onClick={() => organizeTracks("album")}
              >
                Album
              </TableHeadingLgScreen>
              <TableHeading
                selected={sortBy === "artist"}
                onClick={() => organizeTracks("artist")}
              >
                Artist
              </TableHeading>
              <TableHeadingLgScreen
                selected={sortBy === "genre"}
                onClick={() => organizeTracks("genre")}
              >
                Genre
              </TableHeadingLgScreen>
              <TableHeadingLgScreen
                selected={sortBy === "year"}
                onClick={() => organizeTracks("year")}
              >
                Year
              </TableHeadingLgScreen>
              <TableIconHeading>Edit</TableIconHeading>
              <TableIconHeading>Delete</TableIconHeading>
            </TableRow>
          </thead>
          <tbody>
            {sortedTracks.map((t: TTrack) => (
              <TableRow key={t.track_id}>
                <TableData>{t.numOrder}</TableData>
                <TableData>{t.track_name}</TableData>
                <TableDataLgScreen>{t.track_album}</TableDataLgScreen>
                <TableData>{t.track_artist}</TableData>
                <TableDataLgScreen>{t.track_genre}</TableDataLgScreen>
                <TableDataLgScreen>{t.track_year}</TableDataLgScreen>
                <TableIcon>
                  <Link to={`/admin/tracks/update/${t.track_id}`}>
                    <Icon src={editIcon} alt="Edit Button" />
                  </Link>
                </TableIcon>
                <TableIcon>
                  <Icon
                    src={garbageIcon}
                    alt="Delete Button"
                    onClick={() => openDeletePopup(t.track_id)}
                  />
                </TableIcon>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </AdminTracksDiv>
    </AdminLayout>
  );
};

export default AdminTracks;
