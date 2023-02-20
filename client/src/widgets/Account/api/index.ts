import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "processes/api";
import { IUserState } from "entities/user";
import { IOrder } from "features/order/model";

export interface IOrdersFetched extends IOrder{
  id: number,
  createdAt: string,
  updatedAt: string,
}

const fetchOrdersByUserId = createAsyncThunk<IOrdersFetched[], void, { state: { userReducer: IUserState } }>(
  "account/fetchOrdersByUserId",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { userReducer } = getState();
      const response = await $api.post("api/order/get-by-id", { id: userReducer.user?.id });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export { fetchOrdersByUserId };