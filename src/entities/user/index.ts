import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$api} from "processes/api";

export interface IRegistrationProps {
    id?: number
    email: string,
    dateOfBirth: Date,
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
    dateOfBirth: Date,
    id: number,
    email: string,
    isActivated: boolean,
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

export interface IUser {
    name: string,
    surname: string,
    id: number,
    role: 'USER' | 'ADMIN'
}

export interface IUserState {
    isAuth: boolean,
    user: IUser | null,
    error: string | undefined | null,
    status: 'fulfilled' | 'pending' | 'rejected'
}

const fetchUserInfo = createAsyncThunk<IUserInfo, void, { rejectValue: string }>(
    'user/fetchUserInfo',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $api.get('api/user/info');
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message)
        }
    }
)

const fetchPatchUserInfo = createAsyncThunk<any, Omit<IRegistrationProps, "password">, { state: RootState }>(
    "user/fetchPatchUserInfo",
    async ({email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room}, {getState}) => {
        const {userReducer} = await getState();
        if ("user" in userReducer && "id" in userReducer.user) {
            return await $api.patch("api/user/patch", {
                id: userReducer.user?.id, email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room
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
    error: null,
    status: 'pending'
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
            .addCase(fetchUserInfo.pending, (state: IUserState) => {
                state.status = 'pending'
            })
            .addCase(fetchUserInfo.fulfilled, (state: IUserState) => {
                state.status = 'fulfilled'
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.user = {} as IUser;
                state.isAuth = false;
                state.status = 'rejected'
                state.error = action.payload;
            });
    }
});

export {fetchUserInfo, fetchPatchUserInfo};

export const selectUser = (state: RootState) => state.userReducer;
export const {setAuth, setUser} = userSlice.actions;
export default userSlice.reducer;