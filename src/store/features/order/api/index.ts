import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserState} from "@store/features/user";
import {ICartState} from "@store/features/cart/api";
import OrderDto from "@store/features/order/model/OrderDto";
import {$api} from "@services/api";
import {IFormData} from "../model";
import {IPromocodeState} from "@store/features/promocode/api";
import {ILocationState} from "@store/features/location/api";
import Frontpad from "@services/frontpad";
import convertTimeToDateTime from "@shared/utils/convertTimeToDateTime";


const fetchOrderCreate = createAsyncThunk<void, IFormData, {
    rejectValue: any,
    state: { userReducer: IUserState, cartReducer: ICartState, promocodeReducer: IPromocodeState, locationReducer: ILocationState }
}>(
    'order/fetchOrderCreate',
    async (formData, {rejectWithValue, getState}) => {

        try {
            const {userReducer, cartReducer, promocodeReducer, locationReducer} = getState();
            const currentBranchData = locationReducer.allBranches.find(branch => branch.name === locationReducer.currentBranch);
            const frontpadApi = new Frontpad();
            const frontpadApiResponse = await frontpadApi.newOrder(cartReducer.items, {
                name: formData.name,
                ...(formData.address && {street: formData.address}),
                phone: formData.tel,
                hook_status: ['1', '3', '13', '12', '4', '11', '10'],
                hook_url: process.env.WEBHOOK_FRONTPAD_STATUS,
                street: formData.address || '',
                ...(formData.entrance && {pod: formData.entrance}),
                ...(formData.floor && {et: formData.floor}),
                ...(formData.room && {apart: formData.room}),
                ...(formData.email && {mail: formData.email}),
                ...(formData.commentary && {descr: formData.commentary}),
                pay: formData.payment === 'cash' ? 1 : 1228,
                person: formData.utensils || 0,
                ...(locationReducer.currentBranch !== 'Армавир' && {affiliate: currentBranchData?.id}),
                channel: 2030,
                ...(formData.time && {datetime: convertTimeToDateTime(formData.time)}),
            })
            const orderDto = new OrderDto(cartReducer, frontpadApiResponse.data?.order_id || 0, userReducer, formData, promocodeReducer.promocode?.code, locationReducer);
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