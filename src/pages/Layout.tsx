import React, { ReactNode } from "react";
import Navbar from "../components/navbar";
import CookieConsent from "../components/CookieConsent";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <CookieConsent />
    </div>
  );
};

export default Layout;
