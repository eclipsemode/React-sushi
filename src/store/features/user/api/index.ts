import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { $api } from '@services/api';
import { RootState } from '@store/index';
import { TAsyncThunkStatus } from '@store/model/asyncThunkModel';
import { IRegistrationProps, IUser } from '@store/features/user/model';

const getUserData = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string; state: RootState }
>('user/getUserData', async (_, { rejectWithValue, getState }) => {
  try {
    const { authReducer } = getState();
    const response = await $api.get(`api/user/${authReducer?.authUserId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

const fetchPatchUserInfo = createAsyncThunk<
  void,
  Omit<IRegistrationProps, 'password' | 'tel'>,
  { state: RootState }
>(
  'user/fetchPatchUserInfo',
  async (
    { email, name, surname, dateOfBirth, street, house, floor, entrance, room },
    { getState, rejectWithValue }
  ) => {
    try {
      const { authReducer } = getState();
      if (authReducer.isAuth) {
        await $api.patch(`api/user/${authReducer?.authUserId}`, {
          email,
          name,
          surname,
          dateOfBirth: new Date(dateOfBirth),
          street,
          house,
          floor,
          entrance,
          room,
        });
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export interface IUserState {
  user: IUser | null;
  error: string | undefined | null;
  status: TAsyncThunkStatus;
  userLoadSaveProcess: boolean;
}

const initialState: IUserState = {
  user: null,
  error: null,
  status: 'pending',
  userLoadSaveProcess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state: IUserState) => {
        state.error = null;
        state.status = 'pending';
        state.userLoadSaveProcess = true;
      })
      .addCase(getUserData.rejected, (state: IUserState) => {
        state.error = 'error';
        state.status = 'rejected';
        state.userLoadSaveProcess = false;
      })
      .addCase(
        getUserData.fulfilled,
        (state: IUserState, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.userLoadSaveProcess = false;
          state.status = 'fulfilled';
        }
      );
  },
});

export { getUserData, fetchPatchUserInfo };

export const selectUser = (state: RootState) => state.userReducer;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
