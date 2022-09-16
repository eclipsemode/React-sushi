import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $host } from "../../http";
import { AnyAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import jwtDecode from 'jwt-decode';

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

const fetchRegistration = createAsyncThunk<RegistrationPropsType | RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, RegistrationPropsType>(
  'user/fetchRegistration',
  async ({ email, password, name, surname, tel, street, house, floor, entrance, room }, thunkAPI) => {
    try {
      const { data } = await $host.post("api/user/registration", { email, password, name, surname, tel, street, house, floor, entrance, room });
      const token = jwtDecode(data.token);
      return token;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось зарегистрироваться.')
    }
  }
)

const fetchLogin = createAsyncThunk<LoginPropsType | RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, LoginPropsType>(
  'user/fetchLogin',
  async ({ login, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await $host.post("api/user/login", { email: login, password });
      const userData = jwtDecode(data.token);
      dispatch(setUser(userData));
      dispatch(setAuth(true));
      return userData;
    } catch (e) {
      return rejectWithValue('Не удалось войти.')
    }
  }
)

const fetchAuth = createAsyncThunk(
  'user/fetchAuth',
  async () => {
    const { data } = await $host.post("api/user/auth");
    return jwtDecode(data.token);
  }
)

type userType = {
  id: number,
  email: string,
  role: "USER" | "ADMIN",
  iat?: number,
  exp?: number
}

const initialState: { isAuth: boolean, user: userType | {} } = {
  isAuth: false,
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  }
})

export const { setAuth, setUser } = userSlice.actions;
export { fetchRegistration, fetchLogin, fetchAuth };
export default userSlice.reducer;