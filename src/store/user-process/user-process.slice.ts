import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { tryAuth } from '../extra/user-actions';
import { saveToken } from '../../services/token';
import { UserAuth } from '../../types/user';

const initialState: UserProcess = {
  authStatus: AuthorizationStatus.Unknown
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(tryAuth.fulfilled, (state, action: PayloadAction<UserAuth>) => {
        state.authStatus = AuthorizationStatus.Auth;
        saveToken(action.payload.token);
      })
      .addCase(tryAuth.rejected, (state, action) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});

// export const {  } = userProcess.actions;
