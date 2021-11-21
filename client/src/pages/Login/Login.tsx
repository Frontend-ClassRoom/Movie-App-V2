import { ChangeEvent, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '~/components/common/Input';
import { Account } from '~/constants/account';
import { LoginErrorType, LOGIN_ERROR } from '~/constants/error';
import { ROUTE_PATH } from '~/constants/path';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<LoginErrorType | ''>('');
  const [disabled, setDisabled] = useState(false);
  const [account, setAccount] = useState<Account>({
    id: '',
    password: '',
  });

  const handleAccount = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleErrorMessage = (errorMessage: LoginErrorType) => {
    setError(errorMessage);
    setTimeout(() => {
      setError('');
      setDisabled(false);
    }, 1500);
  };

  const checkValidation = () => {
    const { id, password } = account;
    const isNullUserId = id === '';
    const isNullUserPassowrd = password === '';
    if (isNullUserId) {
      handleErrorMessage(LOGIN_ERROR.CHECK_ID);
      return false;
    } else if (isNullUserPassowrd) {
      handleErrorMessage(LOGIN_ERROR.CHECK_PASSWORD);
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    const passUserAccount = checkValidation() === true;
    setDisabled(true);
    passUserAccount && navigate(ROUTE_PATH.HOME);
  };

  return (
    <div className='page-login'>
      <h2 className='title'>LOGIN</h2>
      <Input
        value={account.id}
        type='text'
        name='id'
        onChange={handleAccount}
        disabled={disabled}
      />
      <Input
        value={account.password}
        type='password'
        name='password'
        onChange={handleAccount}
        disabled={disabled}
      />
      {error && <p className='error-message'>{error}</p>}
      <div className='btn-set'>
        <button
          type='button'
          title='login'
          className='btn-login'
          disabled={disabled}
          onClick={handleLogin}
        >
          Login
        </button>
        <button type='button' title='find password' className='btn-forgot' disabled={disabled}>
          Find
        </button>
      </div>
      <button
        type='button'
        title='Sign In'
        className='btn-signin'
        onClick={() => navigate(ROUTE_PATH.SIGN_IN)}
      >
        Signin
      </button>
    </div>
  );
};

export default Login;
