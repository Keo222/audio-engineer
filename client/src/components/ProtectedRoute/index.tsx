import { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import styled from "styled-components";

const LoadingDiv = styled.div`
  color: white;
`;

type Props = {
  component: ComponentType<object>;
};

const ProtectedRoute = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <LoadingDiv>
        <p>Loading...</p>
      </LoadingDiv>
    ),
  });

  return <Component />;
};

export default ProtectedRoute;
