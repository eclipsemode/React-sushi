import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import { $api, $api_guest } from '@services/api';
import { setUser } from '@store/features/user/api';
import { RootState } from '@store/index';

export interface IAuthState {
  authUserId: string | null;
  isAuth: boolean;
  error: boolean;
  authLoadSaveProcess: boolean;
}

export interface IConfirmAuth {
  code: number;
  requestId: string;
}

export interface IConfirmAuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

interface ILogout {
  userId: string;
}

export const refreshToken = createAsyncThunk<IConfirmAuthResponse, void>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api_guest.get('api/auth/refresh');
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signIn = createAsyncThunk<string, string>(
  'auth/signIn',
  async (tel, { rejectWithValue }) => {
    try {
      const res = await $api_guest.post('api/auth', {
        tel: tel.replace(/[^\d]/g, ''),
      });
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const confirmAuth = createAsyncThunk<IConfirmAuthResponse, IConfirmAuth>(
  'auth/confirmAuth',
  async ({ code, requestId }, { rejectWithValue }) => {
    try {
      const res = await $api_guest.post('api/auth/confirm', {
        code,
        requestId,
      });
      if (res.data.accessToken)
        localStorage.setItem('accessToken', res.data.accessToken);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk<void, ILogout>(
  'auth/logout',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await $api.post('api/auth/logout', data);
      localStorage.removeItem('accessToken');
      dispatch(setUser(null));
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState: IAuthState = {
  authUserId: null,
  isAuth: false,
  error: false,
  authLoadSaveProcess: false,
};

const isPendingAction = isPending(signIn, confirmAuth, refreshToken, logout);
const isFulfilledAction = isFulfilled(
  signIn,
  confirmAuth,
  refreshToken,
  logout
);
const isisRejectedAction = isRejected(
  signIn,
  confirmAuth,
  refreshToken,
  logout
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.authUserId = null;
        state.isAuth = false;
        state.error = false;
      })
      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<IConfirmAuthResponse>) => {
          state.authUserId = action.payload.userId;
          state.isAuth = true;
        }
      )

      .addCase(confirmAuth.pending, (state) => {
        state.isAuth = false;
        state.authUserId = null;
        state.error = false;
      })
      .addCase(
        confirmAuth.fulfilled,
        (state, action: PayloadAction<IConfirmAuthResponse>) => {
          state.isAuth = true;
          state.authUserId = action.payload.userId;
          state.error = false;
        }
      )
      .addCase(confirmAuth.rejected, (state) => {
        state.authUserId = null;
        state.isAuth = false;
        state.error = true;
      });

    builder
      .addMatcher(
        (action) => isPendingAction(action),
        (state) => {
          state.error = false;
          state.authLoadSaveProcess = true;
        }
      )
      .addMatcher(
        (action) => isFulfilledAction(action),
        (state) => {
          state.error = false;
          state.authLoadSaveProcess = false;
        }
      )
      .addMatcher(
        (action) => isisRejectedAction(action),
        (state) => {
          state.error = true;
          state.authLoadSaveProcess = false;
        }
      );
  },
});

export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;
