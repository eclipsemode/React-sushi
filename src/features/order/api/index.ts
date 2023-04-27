import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserState } from "entities/user";
import { ICartState } from "entities/cart";
import OrderDto from "features/order/model/OrderDto";
import { $api } from "processes/api";
import { IOrder } from "../model";

const fetchOrderCreate = createAsyncThunk<void, Partial<IOrder>, { rejectValue: any, state: { userReducer: IUserState, cartReducer: ICartState } }>(
  'order/fetchOrderCreate',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { userReducer, cartReducer } = getState();
      const orderDto = new OrderDto(cartReducer, userReducer, formData)
      await $api.post('api/order/create', orderDto.order);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export { fetchOrderCreate }