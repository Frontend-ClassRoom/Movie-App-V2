import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllUserQuery } from '~/api/auth';
import { ROUTE_PATH } from '~/constants/path';
import { setLogout, authSelector } from '~/store/slices/user';

const Styles = {
  fontSize: '20px',
  color: 'peru',
};

const Home = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { data: AcountList, isFetching, isLoading } = useGetAllUserQuery(undefined);
  const { isLogin, nickName, token } = useSelector(authSelector);
  const isNotLogin = isLogin === false;

  const handleLogout = () => {
    navigate(ROUTE_PATH.LOG_IN);
    dispath(setLogout());
  };

  if (isNotLogin) return null;
  console.log('@@ 유저리스트 테스트', AcountList, isLoading, isFetching);

  return (
    <div className='contents'>
      <strong style={Styles}>{`isLoggedIn : ${isLogin}`}</strong>
      <p style={{ fontSize: '14px' }}>{`UserId : ${nickName}`}</p>
      <button type='button' title='logout' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
