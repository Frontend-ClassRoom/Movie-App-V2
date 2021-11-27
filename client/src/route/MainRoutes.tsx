import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_PATH } from '~/constants/path';
import { Home, Login, Signin } from '~/pages';
import { AuthRedirect } from '.';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <AuthRedirect>
          <Routes>
            <Route path={ROUTE_PATH.HOME} element={<Home />} />
            <Route path={ROUTE_PATH.LOG_IN} element={<Login />} />
            <Route path={ROUTE_PATH.SIGN_IN} element={<Signin />} />
          </Routes>
        </AuthRedirect>
      </div>
    </BrowserRouter>
  );
};

export default MainRoutes;
