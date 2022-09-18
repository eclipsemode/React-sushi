import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $host } from "../../http";
import jwtDecode from "jwt-decode";

type RegistrationPropsType = {
  email: string,
  password: string,
  name: string,
  surname: string,
  tel: string,
  street: string,
  house: string,
  floor: string,
  entrance: string,
  room: string
}

type LoginPropsType = {
  login: string,
  password: string
}

const fetchRegistration = createAsyncThunk<RegistrationPropsType, RegistrationPropsType, { rejectValue: string }>(
  "user/fetchRegistration",
  async ({ email, password, name, surname, tel, street, house, floor, entrance, room }, { rejectWithValue }) => {
    try {
      const { data } = await $host.post("api/user/registration", {
        email,
        password,
        name,
        surname,
        tel,
        street,
        house,
        floor,
        entrance,
        room
      });
      return jwtDecode(data.token);
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);


const fetchLogin = createAsyncThunk<UserType, LoginPropsType, { rejectValue: string }>(
  "user/fetchLogin",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const { data } = await $host.post("api/user/login", { email: login, password });
      return jwtDecode(data.token) as UserType;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const fetchAuth = createAsyncThunk(
  "user/fetchAuth",
  async () => {
    const { data } = await $host.post("api/user/auth");
    return jwtDecode(data.token);
  }
);

type UserType = {
  id: number,
  email: string,
  role: "USER" | "ADMIN",
  iat?: number,
  exp?: number
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const initialState: { isAuth: boolean, user: UserType | {}, error: string | null } = {
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
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  }
});

export { fetchRegistration, fetchLogin, fetchAuth };
export default userSlice.reducer;