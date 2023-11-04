import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import { $api, $api_guest } from '@services/api';

type PromoCodeLimitType = 'infinite' | number;

export enum PromoCodeTypeEnum {
  RUB = 'RUB',
  percent = 'percent',
}

export interface IPromocode {
  id: number;
  code: string;
  type: PromoCodeTypeEnum;
  discount: number;
  limit: PromoCodeLimitType;
}

export interface IPromocodeWithPagination {
  count: number;
  rows: IPromocode[];
}

export interface IPromocodeCreate extends Omit<IPromocode, 'id'> {}
interface IChangePromocode extends Pick<IPromocode, 'code'> {
  newValue: PromoCodeLimitType;
}

export const PromoCodeListSize = 10;

export const fetchPromocodeCheck = createAsyncThunk<
  Awaited<any>,
  string,
  { rejectValue: any }
>('promocode/fetchPromocodeCheck', async (code, { rejectWithValue }) => {
  try {
    const { data } = await $api_guest.post<Awaited<IPromocode>>(
      'api/promocode/check',
      { code }
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
        `api/promocode/get?page=${page}&size=${PromoCodeListSize}&match=${match}`
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
      const res = await $api.post('api/promocode/create', {
        code,
        discount,
        type,
        limit,
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
  async (code, { rejectWithValue }) => {
    try {
      const res = await $api.post('api/promocode/delete', { code });
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
  async ({ code, newValue }, { rejectWithValue }) => {
    try {
      const res = await $api.put('api/promocode/change', { code, newValue });
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
  name: 'promocodeReducer',
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
          state.promocodesList = action.payload.rows;
          state.promocodesCount = action.payload.count;
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
