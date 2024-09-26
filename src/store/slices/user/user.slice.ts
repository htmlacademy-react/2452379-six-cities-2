import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../const';
import { removeToken, saveToken } from '../../../services/token';
import { UserData } from '../../../types/user';
import { UserSlice } from './type';
import { fetchAuthThunk, logInThunk, logOutThunk } from './user.thunks';

const initialState: UserSlice = {
  authStatus: AuthorizationStatus.Unknown,
  userData: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        saveToken(action.payload.token);
      })
      .addCase(fetchAuthThunk.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logInThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        saveToken(action.payload.token);
      })
      .addCase(logInThunk.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        removeToken();
      });
  }
});

// export const {  } = userProcess.actions;
