import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUserState } from "entities/user";
import { ICartState } from "entities/cart";
import OrderDto from "features/order/model/OrderDto";
import { $api } from "processes/api";
import {IFormData, IOrder} from "../model";

const fetchOrderCreate = createAsyncThunk<void, Partial<IOrder>, { rejectValue: any, state: { userReducer: IUserState, cartReducer: ICartState } }>(
  'order/fetchOrderCreate',
  async (formData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { userReducer, cartReducer } = getState();
      const orderDto = new OrderDto(cartReducer, userReducer, formData)
      await $api.post('api/order/create', orderDto.order);
      dispatch(setFormData(null))
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

export interface IOrderCreate {
    formData: IFormData | null
}

const initialState: IOrderCreate = {
    formData: null
}

const orderCreateSlice = createSlice({
    name: 'orderCreateReducer',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<IFormData | null>) => {
            state.formData = action.payload;
        }
    }
})

export const { setFormData } = orderCreateSlice.actions;

export { fetchOrderCreate }

export default orderCreateSlice.reducer;