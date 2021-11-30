import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '~/api/auth';
import Input from '~/components/common/Input';
import { Account } from '~/constants/account';
import { ROUTE_PATH } from '~/constants/path';
import { authSelector } from '~/store/slices/user';

const Signup = () => {
  const { isLogin } = useSelector(authSelector);
  const navigate = useNavigate();
  const [signup, { isError, isSuccess, isLoading }] = useSignupMutation();
  const [account, setAccount] = useState<Account>({
    userId: '',
    userNickName: '',
    password: '',
  });

  const handleAccount = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    await signup(account);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTE_PATH.LOG_IN);
    }
  }, [isSuccess]);

  if (isLogin) return null;

  return (
    <div className='page-signup'>
      <h2 className='title'>Signup</h2>
      <div className='form'>
        <Input
          value={account.userId}
          type='text'
          name='userId'
          label='ID'
          onChange={handleAccount}
          onSubmit={handleSignup}
          disabled={isLoading}
        />
        <Input
          value={account.userNickName || ''}
          type='text'
          name='userNickName'
          label='NickName'
          onChange={handleAccount}
          onSubmit={handleSignup}
          disabled={isLoading}
        />
        <Input
          value={account.password}
          type='password'
          name='password'
          label='Password'
          onChange={handleAccount}
          onSubmit={handleSignup}
          disabled={isLoading}
        />
        <button type='button' title='Sign Up' className='btn-signup' onClick={handleSignup}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Signup;
