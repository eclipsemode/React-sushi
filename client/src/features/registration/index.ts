import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "processes/http";

interface IRegistrationProps {
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
const fetchUserRegistration = createAsyncThunk<any, IRegistrationProps>(
  "registration/fetchUserRegistration",
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
      await $api.post(
        "api/user/registration",
        {
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
        }
      )
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export { fetchUserRegistration }

// interface IRegistrationState {
//   loading: boolean,
//   error: any,
//   success: boolean
// }
//
// const initialState: IRegistrationState = {
//   loading: false,
//   error: null,
//   success: false
// }
//
// const userRegistrationSlice = createSlice({
//   name: 'registration',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserRegistration.pending, (state) => {
//       state.loading = true;
//       state.error = null
//     })
//       .addCase(fetchUserRegistration.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(fetchUserRegistration.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//   }
// })
//
// export default userRegistrationSlice.reducer;