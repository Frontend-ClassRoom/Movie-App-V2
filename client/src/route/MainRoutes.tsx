import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_PATH } from '~/constants/path';
import { Home, Login, Signin } from '~/pages';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.HOME} element={<Home />} />
        <Route path={ROUTE_PATH.LOG_IN} element={<Login />} />
        <Route path={ROUTE_PATH.SIGN_IN} element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
