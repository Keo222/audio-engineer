import styled from "styled-components";

// Styled Components
const ErrorBox = styled.div`
  width: 100%;
  color: red;
  text-align: center;
  border: 2px solid red;
  border-radius: 10px;
`;
const ErrorText = styled.p`
  font-size: 1.6rem;
`;

type Props = { children: JSX.Element };

const FormikErrorMsg = ({ children }: Props) => {
  return <ErrorBox>{children}</ErrorBox>;
};

export default FormikErrorMsg;
