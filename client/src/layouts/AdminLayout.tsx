import { ReactNode } from "react";

// Navbar
import AdminNavbar from "components/AdminNavbar";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <header>
        <AdminNavbar />
      </header>
      {children}
    </div>
  );
};

export default AdminLayout;
