import React, { ReactNode } from "react";
import Pagination from "../../../../components/pagination";
import Bannerad from "../../../../components/bannerad"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <footer>
        <Pagination mainSlug="school" />
        <Bannerad />
      </footer>
    </div>
  );
};

export default Layout;
