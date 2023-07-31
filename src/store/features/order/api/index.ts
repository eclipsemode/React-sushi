import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserState} from "@store/features/user";
import {ICartState} from "@store/features/cart/api";
import OrderDto from "@store/features/order/model/OrderDto";
import {$api} from "@services/api";
import {IFormData} from "../model";
import {IPromocodeState} from "@store/features/promocode/api";
import Frontpad from "@services/frontpad";


const fetchOrderCreate = createAsyncThunk<void, IFormData, {
    rejectValue: any,
    state: { userReducer: IUserState, cartReducer: ICartState, promocodeReducer: IPromocodeState }
}>(
    'order/fetchOrderCreate',
    async (formData, {rejectWithValue, getState}) => {
        try {
            const {userReducer, cartReducer, promocodeReducer} = getState();
            const orderDto = new OrderDto(cartReducer, userReducer, formData, promocodeReducer.promocode?.code);
            const frontpadApi = new Frontpad();
            frontpadApi.newOrder(cartReducer.items, {
                name: formData.name,
                ...(formData.address && {street: formData.address}),
                phone: formData.tel,
                hook_status: ['1', '3', '13', '12', '4', '11', '10']
            })
            return;
            const response = await $api.post('api/order/create', orderDto.order);
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

export interface IOrderCreate {
    orderCreateLoadProcess: boolean
    formData: IFormData | null,
    orderError: boolean,
}

const initialState: IOrderCreate = {
    orderCreateLoadProcess: false,
    formData: null,
    orderError: false
}

const orderCreateSlice = createSlice({
    name: 'orderCreateReducer',
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
            .addCase(fetchOrderCreate.pending, (state) => {
                state.orderError = false;
                state.orderCreateLoadProcess = true;

            })
            .addCase(fetchOrderCreate.fulfilled, (state) => {
                state.orderError = false;
                state.orderCreateLoadProcess = false;
            })
            .addCase(fetchOrderCreate.rejected, (state) => {
                state.orderError = true;
                state.orderCreateLoadProcess = false;
            })
    }
})

export const {setFormData, clearOrderData} = orderCreateSlice.actions;

export {fetchOrderCreate}

export default orderCreateSlice.reducer;