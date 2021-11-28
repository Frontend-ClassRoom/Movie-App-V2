import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '~/api/auth';
import Input from '~/components/common/Input';
import { Account } from '~/constants/account';
import { LoginErrorType, LOGIN_ERROR } from '~/constants/error';
import { ROUTE_PATH } from '~/constants/path';
import { setLogin, userSelector } from '~/store/slices/user';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<LoginErrorType | ''>('');
  const [account, setAccount] = useState<Account>({
    userId: '',
    password: '',
  });
  const { isLogin } = useSelector(userSelector);
  const [login, { error: mutationError, isSuccess, isLoading }] = useLoginMutation();

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
    if (passUserAccount) {
      const { userId, password } = account;
      await login({ userId, password });
    }
  };

  useEffect(() => {
    const isMutationError = mutationError && 'status' in mutationError;
    if (isMutationError) {
      const { status } = mutationError;
      if (status === 401) {
        handleErrorMessage(LOGIN_ERROR.UNAUTHORIZED);
        setAccount({
          ...account,
          userId: '',
          password: '',
        });
      }
    }
    if (isSuccess) {
      navigate(ROUTE_PATH.HOME);
    }
  }, [mutationError, isSuccess]);

  if (isLogin) return null;

  return (
    <div className='page-login'>
      <h2 className='title'>LOGIN</h2>
      <div className='form'>
        <Input
          type='text'
          name='userId'
          value={account.userId}
          label='ID'
          onChange={handleAccount}
          onSubmit={handleLogin}
          disabled={isLoading}
        />
        <Input
          type='password'
          name='password'
          value={account.password}
          label='Password'
          onChange={handleAccount}
          onSubmit={handleLogin}
          disabled={isLoading}
        />
        <div className='btn-set'>
          <button
            type='button'
            title='login'
            className='btn-login'
            onClick={handleLogin}
            disabled={isLoading}
          >
            Login
          </button>
          <button
            type='button'
            title='Sign In'
            className='btn-signin'
            disabled={isLoading}
            onClick={() => navigate(ROUTE_PATH.SIGN_UP)}
          >
            Signup
          </button>
        </div>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
