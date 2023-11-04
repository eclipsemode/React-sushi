import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { $api, $api_guest } from '@services/api';
import { setAuth, setUser } from '@store/features/user';
import {RootState} from '@store/index';

export interface IAuthState {
  error: boolean;
  authLoadSaveProcess: boolean;
}

export interface IConfirmAuth {
  code: number;
  requestId: string;
}

export interface IConfirmAuthResponse {
  accessToken: string;
}

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.get('api/user/refresh');
      localStorage.setItem('accessToken', response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
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
      const res = await $api_guest.post('api/user/auth', { tel });
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
  async ({ code, requestId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await $api_guest.post('api/user/confirm', {
        code,
        requestId,
      });
      await dispatch(fetchAuth());
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

const initialState: IAuthState = {
  error: false,
  authLoadSaveProcess: false,
};

const isPendingAction = isPending(signIn, confirmAuth, fetchAuth);
const isFulfilledAction = isFulfilled(signIn, confirmAuth, fetchAuth);
const isisRejectedAction = isRejected(signIn, confirmAuth, fetchAuth);

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.error = false;
      })
      .addCase(fetchAuth.fulfilled, (state) => {
        state.error = false;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.error = true;
      });

    builder
      .addMatcher(
        (action) => isPendingAction(action),
        (state) => {
          state.authLoadSaveProcess = true;
        }
      )
      .addMatcher(
        (action) => isFulfilledAction(action) || isisRejectedAction(action),
        (state) => {
          state.authLoadSaveProcess = false;
        }
      );
  },
});

export const selectAuth = (state: RootState) => state.authReducer;

export default userAuthSlice.reducer;
