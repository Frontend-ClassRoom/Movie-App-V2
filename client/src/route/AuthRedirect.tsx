import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '~/store/slices/user';
import { ROUTE_PATH } from '~/constants/path';

interface Props {
  children: ReactNode;
}
const isLoginBlackListPath = ['/login', '/signup'];

const AuthRedirect = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLogin } = useSelector(userSelector);
  const isNotLogin = isLogin === false;
  const checkBlackListPath = isLoginBlackListPath.includes(pathname);

  useEffect(() => {
    if (isLogin && checkBlackListPath) return navigate(ROUTE_PATH.HOME);
    if (isNotLogin && !checkBlackListPath) return navigate(ROUTE_PATH.LOG_IN);
  }, [pathname]);

  return <>{children}</>;
};

export default AuthRedirect;
