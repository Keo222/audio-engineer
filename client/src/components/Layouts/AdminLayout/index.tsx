import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <header></header>
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
