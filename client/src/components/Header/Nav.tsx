import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'src/constants/routes';

const Nav = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTE_PATH.ROOT}>Home</Link>
      </li>
      <li>
        <Link to={ROUTE_PATH.LOGIN}>Login</Link>
      </li>
      <li>
        <Link to={ROUTE_PATH.SIGNIN}>Signin</Link>
      </li>
    </ul>
  );
};

export default Nav;
