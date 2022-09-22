import styled, { keyframes } from "styled-components";

// Styled Components
const spin = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  width: 80px;
  aspect-ratio: 1;
  margin: 30vh auto 0;
  /* border-radius: 50%;
  border-width: 5px;
  border-style: solid;
  border-color: white; */
  /* border-image: linear-gradient(
    to right,
    ${(props) => props.theme.color.highlight1},
    transparent
  ); */
  animation: ${spin} 5s linear infinite;
  position: relative;
`;

const Ball = styled.div`
  position: absolute;
  width: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
`;

const TLBall = styled(Ball)`
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.color.highlight3};
`;
const TMBall = styled(Ball)`
  top: -15px;
  right: 35px;
  background-color: ${(props) => props.theme.color.highlight1};
`;
const TRBall = styled(Ball)`
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.highlight3};
`;

const RBall = styled(Ball)`
  top: 35px;
  right: -15px;
  background-color: ${(props) => props.theme.color.highlight1};
`;

const BLBall = styled(Ball)`
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.color.highlight3};
`;
const BMBall = styled(Ball)`
  bottom: -15px;
  right: 35px;
  background-color: ${(props) => props.theme.color.highlight1};
`;
const BRBall = styled(Ball)`
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.highlight3};
`;

const LBall = styled(Ball)`
  top: 35px;
  left: -15px;
  background-color: ${(props) => props.theme.color.highlight1};
`;

const LoadingSpinner = () => {
  return (
    <Spinner>
      <TLBall />
      <TMBall />
      <TRBall />
      <RBall />
      <BLBall />
      <BMBall />
      <BRBall />
      <LBall />
    </Spinner>
  );
};

export default LoadingSpinner;
