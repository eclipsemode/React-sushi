import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import { $api, $api_guest } from '@services/api';
import {
  IChangePromocode,
  IPromocode,
  IPromocodeCreate,
  IPromocodeWithPagination,
  PromoCodeListSize,
} from '@store/features/promocode/model';

export const fetchPromocodeCheck = createAsyncThunk<
  Awaited<any>,
  string,
  { rejectValue: any }
>('promocode/fetchPromocodeCheck', async (code, { rejectWithValue }) => {
  try {
    const { data } = await $api_guest.get<Awaited<IPromocode>>(
      `api/promo-code/check/${code}`
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getAllPromoCodes = createAsyncThunk<
  IPromocodeWithPagination,
  { page?: number; match?: string }
>(
  'promocode/getAllPromoCodes',
  async ({ page = 1, match = '' }, { rejectWithValue }) => {
    try {
      const res = await $api.get(
        `api/promo-code?page=${page}&size=${PromoCodeListSize}&match=${match}`
      );
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createPromoCode = createAsyncThunk<IPromocode, IPromocodeCreate>(
  'promocode/createPromoCode',
  async ({ code, discount, type, limit }, { rejectWithValue }) => {
    try {
      const res = await $api.post('api/promo-code', {
        code,
        discount,
        type,
        limit: +limit,
      });
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deletePromocode = createAsyncThunk<string, string>(
  'promocode/deletePromocode',
  async (id, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`api/promo-code/${id}`);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changePromoCode = createAsyncThunk<IPromocode, IChangePromocode>(
  'promocode/changePromoCode',
  async ({ id, code, type, limit, discount }, { rejectWithValue }) => {
    try {
      const res = await $api.patch(`api/promo-code/${id}`, {
        code,
        type,
        limit: +limit,
        discount,
      });
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export interface IPromocodeState {
  promocodeLoadSaveProcess: boolean;
  promocode: IPromocode | null;
  promocodeError: boolean;
  promocodesList: IPromocode[];
  promocodesCount: number;
}

const initialState: IPromocodeState = {
  promocodeLoadSaveProcess: false,
  promocode: null,
  promocodeError: false,
  promocodesList: [],
  promocodesCount: 0,
};

const isPendingAction = isPending(
  fetchPromocodeCheck,
  createPromoCode,
  deletePromocode,
  getAllPromoCodes,
  changePromoCode
);
const isFulfilledAction = isFulfilled(
  fetchPromocodeCheck,
  createPromoCode,
  deletePromocode,
  getAllPromoCodes,
  changePromoCode
);
const isisRejectedAction = isRejected(
  fetchPromocodeCheck,
  createPromoCode,
  deletePromocode,
  getAllPromoCodes,
  changePromoCode
);

const promoCodeSlice = createSlice({
  name: 'promocode',
  initialState,
  reducers: {
    setPromocodeError: (state, action: PayloadAction<boolean>) => {
      state.promocodeError = action.payload;
    },
    setPromocode: (state, action: PayloadAction<IPromocode | null>) => {
      state.promocode = action.payload;
    },
    clearPromocodeData: (state) => {
      state.promocodeError = false;
      state.promocode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromocodeCheck.pending, (state) => {
        state.promocodeError = false;
        state.promocodeLoadSaveProcess = true;
      })
      .addCase(
        fetchPromocodeCheck.fulfilled,
        (state, action: PayloadAction<IPromocode>) => {
          state.promocodeError = false;
          state.promocode = action.payload;
        }
      )
      .addCase(fetchPromocodeCheck.rejected, (state) => {
        state.promocodeError = true;
        state.promocode = null;
      });

    builder
      .addCase(
        getAllPromoCodes.fulfilled,
        (state, action: PayloadAction<IPromocodeWithPagination>) => {
          state.promocodesList = action.payload.list;
          state.promocodesCount = action.payload._count;
        }
      )
      .addCase(getAllPromoCodes.rejected, (state) => {
        state.promocodesList = [];
      });

    builder
      .addMatcher(
        (action) => isPendingAction(action),
        (state) => {
          state.promocodeLoadSaveProcess = true;
        }
      )
      .addMatcher(
        (action) => isFulfilledAction(action) || isisRejectedAction(action),
        (state) => {
          state.promocodeLoadSaveProcess = false;
        }
      );
  },
});

export const { setPromocodeError, setPromocode, clearPromocodeData } =
  promoCodeSlice.actions;

export default promoCodeSlice.reducer;
