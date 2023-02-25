import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "processes/api";
import { IUserState } from "entities/user";
import { IOrder } from "features/order/model";

export interface IOrdersFetched extends IOrder{
  id: number,
  createdAt: string,
  updatedAt: string,
}

type statusType = 'PENDING' | 'FULFILLED' | 'REJECTED';

export interface IOrdersReducer {
  status: statusType;
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

const initialState: IOrdersReducer = {
  status: "PENDING"
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrdersByUserId.pending, (state: IOrdersReducer) => {
      state.status = "PENDING"
    })
      .addCase(fetchOrdersByUserId.fulfilled, (state: IOrdersReducer, action) => {
        if (action.payload.length > 0) {
          state.status = "FULFILLED"
        } else {
          state.status = "REJECTED"
        }
      })
      .addCase(fetchOrdersByUserId.rejected, (state: IOrdersReducer) => {
        state.status = "REJECTED"
      })
  }
})

export { fetchOrdersByUserId };

export default ordersSlice.reducer;