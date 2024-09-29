import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../../const';
import { removeToken, saveToken } from '../../../services/token';
import { UserData } from '../../../types/user';
import { UserSlice } from './type';
import { fetchAuthThunk, logInThunk, logOutThunk } from './user.thunks';

const initialState: UserSlice = {
  authStatus: AuthorizationStatus.Unknown,
  userData: null,
  fetchStatus: FetchStatus.Idle
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthThunk.pending, (state) => {
        state.fetchStatus = FetchStatus.Pending;
      })
      .addCase(fetchAuthThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        state.fetchStatus = FetchStatus.Fullfilled;
        saveToken(action.payload.token);
      })
      .addCase(fetchAuthThunk.rejected, (state) => {
        state.fetchStatus = FetchStatus.Rejected;
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
      })
      .addCase(logOutThunk.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        removeToken();
      });
  }
});

// export const {  } = userProcess.actions;
