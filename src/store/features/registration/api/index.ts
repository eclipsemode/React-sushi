import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@services/api";

interface IRegistrationProps {
  email: string,
  dateOfBirth: Date | null,
  password: string,
  name: string,
  surname: string | null,
  tel: string,
  street: string | null,
  house: number | null,
  floor: number | null,
  entrance: number | null,
  room: number | null
}
const fetchUserRegistration = createAsyncThunk<void, IRegistrationProps>(
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