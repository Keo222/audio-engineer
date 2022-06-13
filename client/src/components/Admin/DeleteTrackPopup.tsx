import styled from "styled-components";

// Styled Elements
const BlurredBackground = styled.div`
  z-index: 200;
  width: 100vw;
  height: 100vh;
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DeleteTrackModal = styled.div`
  width: 60%;
  background: ${(props) => props.theme.color.textDark};
  color: ${(props) => props.theme.color.textLight};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.color.highlight3};
  font-size: 1.6rem;
`;

const ModalInner = styled.div`
  width: 80%;
  margin: 5rem auto;
`;

const ConfirmHeader = styled.h2`
  text-align: center;
  font-size: 2.6rem;
`;

const TrackInfoDiv = styled.div`
  width: 80%;
  max-width: 35rem;
  margin: 5rem auto 0;
`;

const InfoPair = styled.div`
  display: flex;
`;

const InfoLabel = styled.p`
  font-weight: 700;
  margin-right: 1rem;
  color: ${(props) => props.theme.color.highlight3};
`;

const InfoData = styled.p``;

const ButtonDiv = styled.div`
  display: flex;
  margin: 3rem 0;
  justify-content: space-around;
`;

const CancelButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  background: ${(props) => props.theme.color.textLight};
  color: #4a4a4b;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    filter: brightness(0.8);
  }
`;

const DeleteButton = styled(CancelButton)`
  background: #c70000;
  color: ${(props) => props.theme.color.textLight};
`;

type Props = {
  togglePopup: () => void;
  removeTrack: () => Promise<void>;
  name: string;
  artist: string;
};

const DeleteTrackPopup = ({
  togglePopup,
  removeTrack,
  name,
  artist,
}: Props) => {
  const handleDelete = () => {
    removeTrack();
    togglePopup();
  };
  return (
    <BlurredBackground>
      <DeleteTrackModal>
        <ModalInner>
          <ConfirmHeader>
            Are you sure you want to delete this track?
          </ConfirmHeader>
          <TrackInfoDiv>
            <InfoPair>
              <InfoLabel>Name:</InfoLabel>
              <InfoData>{name}</InfoData>
            </InfoPair>
            <InfoPair>
              <InfoLabel>Artist:</InfoLabel>
              <InfoData>{artist}</InfoData>
            </InfoPair>
          </TrackInfoDiv>
          <ButtonDiv>
            <CancelButton onClick={() => togglePopup()}>
              Cancel
            </CancelButton>
            <DeleteButton onClick={() => handleDelete()}>
              Delete
            </DeleteButton>
          </ButtonDiv>
        </ModalInner>
      </DeleteTrackModal>
    </BlurredBackground>
  );
};

export default DeleteTrackPopup;
