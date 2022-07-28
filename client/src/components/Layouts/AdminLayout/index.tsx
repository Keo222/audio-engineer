import { ReactNode } from "react";
import { AdminNavbar } from "../navbars";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <header>
        <AdminNavbar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
