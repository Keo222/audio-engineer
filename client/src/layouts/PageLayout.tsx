import { ReactNode } from "react";

import Navbar from "components/Navbar";

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
