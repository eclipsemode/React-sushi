import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../http";
import jwtDecode from "jwt-decode";

interface IRegistrationProps {
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

interface ILoginProps {
  login: string,
  password: string
}

const fetchRegistration = createAsyncThunk<IRegistrationProps, IRegistrationProps, { rejectValue: string }>(
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


const fetchLogin = createAsyncThunk<UserType, ILoginProps, { rejectValue: string }>(
  "user/fetchLogin",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const { data } = await $host.post("api/user/login", { email: login, password });
      const token: string = data.token;
      localStorage.setItem('token', token);
      const tokenDecoded: UserType = jwtDecode(token);
      return tokenDecoded;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const fetchAuth = createAsyncThunk<UserType, void>(
  "user/fetchAuth",
  async () => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem('token', data.token);
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
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<UserType>) => {
          state.user = action.payload;
          state.isAuth = true;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.user = {};
        state.isAuth = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
  }
});

export { fetchRegistration, fetchLogin, fetchAuth };
export default userSlice.reducer;