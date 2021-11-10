import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { ROUTE_PATH } from '../constants/routes';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signin from '../pages/Signin';
import PostDetail from '../pages/Post/Detail';
import PostList from '../pages/Post/List';
import Nav from '../components/Header/Nav';
import Layout from '../components/Layout';

const MainRoute = () => {
  // V6 react-router-dom ( useRoutes )
  //   const routeElement = useRoutes([
  //     { path: ROUTE_PATH.ROOT, element: <Home /> },
  //     { path: ROUTE_PATH.LOGIN, element: <Login /> },
  //     { path: ROUTE_PATH.SIGNIN, element: <Signin /> },
  //     {
  //       path: ROUTE_PATH.POSTS,
  //       element: <PostList />,
  //       children: [{ path: ROUTE_PATH.DETAIL, element: <PostDetail /> }],
  //     },
  //   ]);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTE_PATH.ROOT} element={<Home />} />
          <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
          <Route path={ROUTE_PATH.SIGNIN} element={<Signin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRoute;
