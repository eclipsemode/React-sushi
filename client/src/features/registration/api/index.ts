import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "processes/api";

interface IRegistrationProps {
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