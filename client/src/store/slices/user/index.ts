import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '~/constants/user';
import { RootState } from '~/store/reducer';

const initialState: User = {
  isLogin: false,
  nickName: '',
  token: '',
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.isLogin = true;
      state.nickName = payload.userId;
      state.token = payload.token;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.nickName = '';
    },
  },
  extraReducers: {},
});

export const { setLogin, setLogout } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice;
