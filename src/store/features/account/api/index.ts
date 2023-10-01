import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { $api } from "@services/api";
import { IUserState } from "@store/features/user";
import {IOrderProducts} from "@store/features/order/model";
import {OrderType} from "@store/features/order/ui";
import {PaymentType} from "@store/features/order/ui/DeliveryForm";

export type StatusType = 'new' | 'accepted' | 'production' | 'produced' | 'delivery' | 'completed' | 'deleted';

export interface IOrdersFetched {
  id: number,
  orderId: number | null,
  createdAt: string,
  updatedAt: string,
  totalPrice: number,
  totalAmount: number,
  type: OrderType,
  name: string,
  chanel: number,
  address: string | null,
  entrance: number | null,
  floor: number | null,
  room: number | null,
  tel: string,
  email: string,
  day: "today" | null,
  time: string | null,
  utensils: number,
  payment: PaymentType,
  commentary: string | null,
  promocode: string | null,
  status: StatusType,
  userId: number,
  products: IOrderProducts[],
  branchId: number
}

type statusType = 'PENDING' | 'FULFILLED' | 'REJECTED';
export type SelectedType = "profile" | "orders" | "settings" | 'admin';

export interface IOrdersReducer {
  status: statusType;
  page: SelectedType,
  count: number
}

export interface IFetchOrdersByUserId {
  count: number,
  rows: IOrdersFetched[]
}

export const AccountOrdersListSize = 10;

const fetchOrdersByUserId = createAsyncThunk<IFetchOrdersByUserId, {page: number, size: number}, { state: { userReducer: IUserState } }>(
  "account/fetchOrdersByUserId",
  async ({page, size}, { rejectWithValue, getState }) => {
    try {
      const { userReducer } = getState();
      const response = await $api.get(`api/order/get-by-user?id=${userReducer.user?.id}&page=${page}&size=${size}`);
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
  status: "PENDING",
  page: 'profile',
  count: 0
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<SelectedType>) => {
      state.page = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchOrdersByUserId.pending, (state: IOrdersReducer) => {
      state.status = "PENDING"
    })
      .addCase(fetchOrdersByUserId.fulfilled, (state: IOrdersReducer, action) => {
        state.count = action.payload.count;
        if (action.payload.rows.length > 0) {
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

export const {setPage} = ordersSlice.actions;

export default ordersSlice.reducer;