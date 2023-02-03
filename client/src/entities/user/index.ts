import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $api } from "processes/api";

export interface IRegistrationProps {
  id?: number
  email: string,
  dateOfBirth: string,
  password: string,
  name: string,
  surname: string,
  tel: string,
  street: string,
  house: string | number,
  floor: string | number,
  entrance: string | number,
  room: string | number
}

export interface IUserInfo {
  activationLink: string,
  dateOfBirth: string,
  id: number,
  email: string,
  isActivated: boolean,
  password: string,
  name: string,
  surname: string,
  tel: string,
  street: string,
  house: string,
  floor: string ,
  entrance: string,
  room: string
}

export interface IUser {
  name: string,
  surname: string,
  id: number,
  role: 'USER' | 'ADMIN'
}

export interface IUserState {
  isAuth: boolean,
  user: IUser | null,
  error: string | undefined | null
}

const fetchUserInfo = createAsyncThunk<IUserInfo, void, { rejectValue: string }>(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response =await $api.get('api/user/info');
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message)
    }
  }
)

const fetchPatchUserInfo = createAsyncThunk<any, Omit<IRegistrationProps, "password">, { state: { user: IUserState } }>(
  "user/fetchPatchUserInfo",
  async ({ email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room }, { getState }) => {
    const { user }  = await getState();
    // @ts-ignore
    if ("user" in user && "id" in user.user) {
      return await $api.patch("api/user/patch", {
        id: user.user?.id, email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room
      });
    }
  }
);

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

const initialState: IUserState = {
  isAuth: false,
  user: null,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.user = {} as IUser;
        state.isAuth = false;
        state.error = action.payload;
      });
  }
});

export { fetchUserInfo, fetchPatchUserInfo };
export const { setAuth, setUser } = userSlice.actions;
export default userSlice.reducer;