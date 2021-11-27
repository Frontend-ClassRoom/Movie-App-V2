import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '~/constants/user';
import { RootState } from '~/store/reducer';

const initialState: User = {
  isLogin: false,
  nickName: '',
};

const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.nickName = action.payload;
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
