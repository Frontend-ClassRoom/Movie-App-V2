import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '~/constants/path';
import { setLogout, userSelector } from '~/store/slices/user';

const Styles = {
  fontSize: '20px',
  color: 'peru',
};

const Home = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { isLogin, nickName } = useSelector(userSelector);

  const handleLogout = () => {
    navigate(ROUTE_PATH.LOG_IN);
    dispath(setLogout());
  };

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
