import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '~/api/auth';
import Input from '~/components/common/Input';
import { Account } from '~/constants/account';
import { LoginErrorType, LOGIN_ERROR } from '~/constants/error';
import { ROUTE_PATH } from '~/constants/path';
import { setLogin } from '~/store/slices/user';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<LoginErrorType | ''>('');
  const [disabled, setDisabled] = useState(false);
  const [account, setAccount] = useState<Account>({
    userId: '',
    password: '',
  });
  const [login, { error: mutationError, isSuccess }] = useLoginMutation();

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
    const { userId, password } = account;
    const isNullUserId = userId === '';
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

  const handleLogin = async () => {
    const passUserAccount = checkValidation() === true;
    setDisabled(true);
    if (passUserAccount) {
      const { userId, password } = account;
      await login({ userId, password });
    }
  };

  useEffect(() => {
    const isMutationError = mutationError && 'status' in mutationError;
    if (isMutationError) {
      const { status } = mutationError;
      status === 401 && handleErrorMessage(LOGIN_ERROR.UNAUTHORIZED);
    }
    if (isSuccess) {
      dispatch(setLogin(account.userId));
      navigate(ROUTE_PATH.HOME);
    }
  }, [mutationError, isSuccess]);

  return (
    <div className='page-login'>
      <h2 className='title'>LOGIN</h2>
      <Input
        value={account.userId}
        type='text'
        name='userId'
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
        {/* <button type='button' title='find password' className='btn-forgot' disabled={disabled}>
          Find
        </button> */}
      </div>
      <button
        type='button'
        title='Sign In'
        className='btn-signin'
        disabled={disabled}
        onClick={() => navigate(ROUTE_PATH.SIGN_IN)}
      >
        Signin
      </button>
    </div>
  );
};

export default Login;
