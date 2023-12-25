import React, { ReactNode } from "react";
import Pagination from "../../../components/pagination";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <footer>
        <Pagination mainSlug="coaching" />
      </footer>
    </div>
  );
};

export default Layout;
