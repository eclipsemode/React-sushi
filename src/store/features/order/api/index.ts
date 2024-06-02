import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '@store/features/user/api';
import { ICartState } from '@store/features/cart/api';
import OrderDto from '@store/features/order/model/OrderDto';
import { $api } from '@services/api';
import { IFormData, IOrder } from '../model';
import { IPromocodeState } from '@store/features/promocode/api';
import Frontpad from '@services/frontpad';
import convertTimeToDateTime from '@shared/utils/convertTimeToDateTime';
import { IBranchState } from '@store/features/branch/api';

export const AccountOrdersListSize = 10;

export const createOrder = createAsyncThunk<
  void,
  IFormData,
  {
    rejectValue: any;
    state: {
      userReducer: IUserState;
      cartReducer: ICartState;
      promocodeReducer: IPromocodeState;
      branchReducer: IBranchState;
    };
  }
>('order/createOrder', async (formData, { rejectWithValue, getState }) => {
  try {
    const { userReducer, cartReducer, promocodeReducer, branchReducer } =
      getState();
    const { currentBranch } = branchReducer;
    const frontpadApi = new Frontpad();
    const frontpadApiResponse = await frontpadApi.newOrder(
      cartReducer.products,
      {
        name: formData.clientName,
        ...(formData.clientAddress && { street: formData.clientAddress }),
        phone: formData.clientTel,
        hook_status: ['1', '3', '13', '12', '4', '11', '10'],
        hook_url: process.env.WEBHOOK_FRONTPAD_STATUS,
        ...(formData.clientEntrance && { pod: +formData.clientEntrance }),
        ...(formData.clientFloor && { et: +formData.clientFloor }),
        ...(formData.clientRoom && { apart: +formData.clientRoom }),
        ...(formData.clientEmail && { mail: formData.clientEmail }),
        ...(formData.commentary && { descr: formData.commentary }),
        pay: formData.payment === 'CASH' ? 1 : 1228,
        person: +formData.utensils || 0,
        // TODO исправить определение филилала
        // ...(locationReducer.currentBranch !== 'Армавир' && {
        //   affiliate: currentBranchData?.id,
        // }),
        channel: 2030,
        ...(formData.time && {
          datetime: convertTimeToDateTime(formData.time),
        }),
      }
    );
    const orderDto = new OrderDto(
      cartReducer,
      frontpadApiResponse.data?.order_id || null,
      userReducer,
      formData,
      promocodeReducer.promocode?.id,
      branchReducer
    );
    const response = await $api.post('api/order', orderDto.order);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getOrdersByUserId = createAsyncThunk<
  IOrder[],
  { page: number; size: number },
  { state: { userReducer: IUserState } }
>(
  'account/getOrdersByUserId',
  async ({ page, size }, { rejectWithValue, getState }) => {
    try {
      const { userReducer } = getState();
      const response = await $api.get(
        `api/order/user?userId=${userReducer.user?.id}&page=${page}&size=${size}`
      );
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

export interface IOrderState {
  orderCreateLoadProcess: boolean;
  formData: IFormData | null;
  orderError: boolean;
  userOrders: IOrder[];
}

const initialState: IOrderState = {
  orderCreateLoadProcess: false,
  formData: null,
  orderError: false,
  userOrders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<IFormData | null>) => {
      state.orderCreateLoadProcess = true;
      state.formData = action.payload;
      state.orderCreateLoadProcess = false;
    },
    clearOrderData: (state) => {
      state.orderCreateLoadProcess = true;
      state.formData = null;
      state.orderCreateLoadProcess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderError = false;
        state.orderCreateLoadProcess = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.orderError = false;
        state.orderCreateLoadProcess = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderError = true;
        state.orderCreateLoadProcess = false;
      })

      .addCase(getOrdersByUserId.pending, (state) => {
        state.orderCreateLoadProcess = true;
      })
      .addCase(
        getOrdersByUserId.fulfilled,
        (state, action: PayloadAction<IOrder[]>) => {
          state.userOrders = action.payload;
          state.orderCreateLoadProcess = false;
        }
      )
      .addCase(getOrdersByUserId.rejected, (state) => {
        state.userOrders = [];
        state.orderCreateLoadProcess = false;
      });
  },
});

export const { setFormData, clearOrderData } = orderSlice.actions;

export default orderSlice.reducer;
