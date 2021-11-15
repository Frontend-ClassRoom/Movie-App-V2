import { ReactNode, ReactChild } from "react";
import Nav from "src/components/Header/Nav";

interface LayoutProps {
  children: ReactNode | ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
