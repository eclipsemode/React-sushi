import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authHost, $host } from "processes/http";
import jwtDecode from "jwt-decode";

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

interface ILoginProps {
  login: string,
  password: string
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
    email: string,
    id: number,
    isActivated: boolean,
    role: 'USER' | 'ADMIN'
}

export interface IUserState {
  isAuth: boolean,
  user: IUser | {},
  error: string | undefined | null
}

const fetchRegistration = createAsyncThunk<IRegistrationProps, IRegistrationProps, { rejectValue: string }>(
  "user/fetchRegistration",
  async ({
           email,
           password,
           name,
           surname,
           dateOfBirth,
           tel,
           street,
           house,
           floor,
           entrance,
           room
         }, { rejectWithValue }) => {
    try {
      const response = await $host.post("api/user/registration", {
        email,
        password,
        name,
        surname,
        dateOfBirth,
        tel,
        street,
        house,
        floor,
        entrance,
        room
      });
      const token: string = response.data.token;
      localStorage.setItem("token", token);
      return jwtDecode(token);
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);


const fetchLogin = createAsyncThunk<IUser, ILoginProps, { rejectValue: string }>(
  "user/fetchLogin",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await $host.post("api/user/login", { email: login, password });
      const userData = await response.data.user;
      const accessToken: string = userData.accessToken;
      await localStorage.setItem("token", accessToken);
      return jwtDecode(accessToken);
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const fetchLogout = createAsyncThunk<void, void>(
  'user/fetchLogout',
  async (_, { rejectWithValue }) => {
    try {
      await $authHost.get('api/user/logout');
      localStorage.removeItem('token');
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
)

const fetchAuth = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "user/fetchAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $host.get('api/user/refresh');
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const fetchUserInfo = createAsyncThunk<IUserInfo, void, { rejectValue: string }>(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response =await $authHost.get('api/user/info');
        return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message)
    }
  }
)

const fetchPatchUserInfo = createAsyncThunk<any, Omit<IRegistrationProps, "password">, { state: { user: IUserState } }>(
  "user/fetchPatchUserInfo",
  async ({ email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room }, { getState }) => {
    const { user }  = await getState();
    if ("user" in user && "id" in user.user) {
      return await $authHost.patch("api/user/patch", {
        id: user.user.id, email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room
      });
    }
  }
);

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

const initialState: IUserState = {
  isAuth: false,
  user: {},
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
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = {} as IUser;
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.user = {} as IUser;
        state.isAuth = false;
        state.error = action.payload;
      });
  }
});

export { fetchRegistration, fetchLogin, fetchAuth, fetchUserInfo, fetchPatchUserInfo, fetchLogout };
export const { setAuth, setUser } = userSlice.actions;
export default userSlice.reducer;