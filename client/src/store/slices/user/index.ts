import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '~/api/auth';
import { User } from '~/constants/user';
import { RootState } from '~/store/reducer';

interface LoginUserPayload {
  token: string;
  userNickName: string;
}

const initialState: User = {
  isLogin: false,
  nickName: '',
  token: '',
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setLogout: (state) => {
      state.isLogin = false;
      state.nickName = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginUserPayload>) => {
        const { token, userNickName } = payload;
        state.isLogin = true;
        state.nickName = userNickName;
        state.token = token;
      },
    );
  },
});

export const { setLogout } = userSlice.actions;
export const authSelector = (state: RootState) => state.user;
export default userSlice;
