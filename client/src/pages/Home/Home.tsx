import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllUserQuery } from '~/api/auth';
import { ROUTE_PATH } from '~/constants/path';
import { setLogout, userSelector } from '~/store/slices/user';

const Styles = {
  fontSize: '20px',
  color: 'peru',
};

const Home = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { data } = useGetAllUserQuery(undefined);
  const { isLogin, nickName } = useSelector(userSelector);
  const isNotLogin = isLogin === false;
  const handleLogout = () => {
    navigate(ROUTE_PATH.LOG_IN);
    dispath(setLogout());
  };

  console.log('@@ 가입한 유저목록', data);
  if (isNotLogin) return null;

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
