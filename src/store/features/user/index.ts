import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$api} from "@services/api";

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
    dateOfBirth: Date | string | null,
    id: number,
    email: string,
    isActivated: boolean,
    password: string,
    name: string,
    surname: string,
    tel: string,
    street: string,
    house: number,
    floor: number,
    entrance: number,
    room: number
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
    userInfo: Partial<IUserInfo> | null
    error: string | undefined | null,
    status: 'fulfilled' | 'pending' | 'rejected'
}

const fetchUserInfo = createAsyncThunk<IUserInfo, void, { rejectValue: string }>(
    'user/fetchUserInfo',
    async (_, {rejectWithValue}) => {
        try {
            const response = await $api.get('api/user/info');
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

const fetchPatchUserInfo = createAsyncThunk<any, Omit<IRegistrationProps, "password">, { state: RootState }>(
    "user/fetchPatchUserInfo",
    async ({email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room}, {getState, rejectWithValue}) => {
        try {
            const {userReducer} = await getState();
            if (userReducer.isAuth) {
                await $api.patch("api/user/patch", {
                    id: userReducer.user?.id, email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room
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

// function isError(action: AnyAction) {
//     return action.type.endsWith("rejected");
// }

const initialState: IUserState = {
    isAuth: false,
    user: null,
    userInfo: null,
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
                state.error = null;
                state.status = 'pending';
            })
            .addCase(fetchUserInfo.fulfilled, (state: IUserState, action: PayloadAction<IUserInfo>) => {
                state.userInfo = {
                    dateOfBirth: action.payload.dateOfBirth,
                    email: action.payload.email,
                    name: action.payload.name,
                    surname: action.payload.surname,
                    tel: action.payload.tel,
                    street: action.payload.street,
                    house: action.payload.house,
                    floor: action.payload.floor ,
                    entrance: action.payload.entrance,
                    room: action.payload.room
                }
                state.status = 'fulfilled'
            })
            // .addMatcher(isError, (state, action: PayloadAction<string>) => {
            //     state.user = {} as IUser;
            //     state.isAuth = false;
            //     state.status = 'rejected'
            //     state.error = action.payload;
            // });
    }
});

export {fetchUserInfo, fetchPatchUserInfo};

export const selectUser = (state: RootState) => state.userReducer;
export const {setAuth, setUser} = userSlice.actions;
export default userSlice.reducer;