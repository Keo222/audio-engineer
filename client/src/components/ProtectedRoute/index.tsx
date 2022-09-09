import { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingSpinner from "components/etc/LoadingSpinner";

type Props = {
  component: ComponentType<object>;
};

const ProtectedRoute = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingSpinner />,
  });

  return <Component />;
};

export default ProtectedRoute;
