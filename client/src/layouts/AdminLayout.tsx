import { ReactNode } from "react";

// Navbar
import { AdminNavbar } from "components/navbars";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <header>
        <AdminNavbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
