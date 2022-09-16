import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $host } from "../../http";

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

export const fetchRegistration = createAsyncThunk<RegistrationPropsType, RegistrationPropsType>(
  'user/fetchRegistration',
  async ({ email, password, name, surname, tel, street, house, floor, entrance, room }) => {
    return await $host.post("api/user/registration", { email, password, name, surname, tel, street, house, floor, entrance, room });
  }
)

export const fetchLogin = createAsyncThunk<LoginPropsType, LoginPropsType>(
  'user/fetchLogin',
  async ({ login, password }) => {
    return await $host.post("api/user/login", { login, password });
  }
)

export const fetchAuth = createAsyncThunk(
  'user/fetchAuth',
  async () => {
    return await $host.post("api/user/auth");
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    log: false
  },
  reducers: {}
})

export default userSlice.reducer;