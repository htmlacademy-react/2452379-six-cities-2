import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../const';
import { saveToken } from '../../../services/token';
import { UserAuth } from '../../../types/user';
import { UserSlice } from './type';
import { fetchAuth } from './user.thunks';

const initialState: UserSlice = {
  authStatus: AuthorizationStatus.Unknown
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<UserAuth>) => {
        state.authStatus = AuthorizationStatus.Auth;
        saveToken(action.payload.token);
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});

// export const {  } = userProcess.actions;
