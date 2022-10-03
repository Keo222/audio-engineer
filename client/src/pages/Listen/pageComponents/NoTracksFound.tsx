import styled from "styled-components";

// Styled Components
const NoTracksFoundMsg = styled.p`
  font-size: 6rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.textLight};
  text-align: center;

  word-spacing: 20px;
  letter-spacing: 8px;

  background: -webkit-linear-gradient(
    45deg,
    ${(props) => props.theme.color.highlight1} 35%,
    ${(props) => props.theme.color.highlight3},
    ${(props) => props.theme.color.highlight2} 65%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  margin-top: 15vh;
`;

const NoTracksFound = () => {
  return <NoTracksFoundMsg>No Tracks Found</NoTracksFoundMsg>;
};

export default NoTracksFound;
