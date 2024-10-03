import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, FetchStatus, NameSpace } from '../../../const';
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
        state.userData = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
        state.fetchStatus = FetchStatus.Fullfilled;
      })
      .addCase(fetchAuthThunk.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.fetchStatus = FetchStatus.Rejected;
      })
      .addCase(logInThunk.pending, (state) => {
        state.fetchStatus = FetchStatus.Pending;
      })
      .addCase(logInThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userData = action.payload;
        state.authStatus = AuthorizationStatus.Auth;
        state.fetchStatus = FetchStatus.Fullfilled;
      })
      .addCase(logInThunk.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.fetchStatus = FetchStatus.Rejected;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.userData = null;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logOutThunk.rejected, (state) => {
        state.userData = null;
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});

// export const {  } = userProcess.actions;
