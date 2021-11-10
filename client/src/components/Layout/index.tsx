import { ReactNode, ReactChild } from 'react';
import Nav from '../Header/Nav';

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
