import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import {
  SortNameType,
  SortOrderType,
  SortType,
} from '@store/features/filter/model';

export interface IFilterState {
  sortId: number;
  sortType: SortType;
  sortOrder: SortOrderType;
  categoryId: string;
}

const initialState: IFilterState = {
  sortId: 0,
  sortType: SortType.ORDER_INDEX,
  sortOrder: SortOrderType.ASC,
  categoryId: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortNameType>) => {
      state.sortId = action.payload.id;
      state.sortType = action.payload.sortType;
      state.sortOrder = action.payload.orderType;
    },
    setCategoryId: (
      state,
      action: PayloadAction<IFilterState['categoryId']>
    ) => {
      state.categoryId = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filterReducer;
export const { setCategoryId, setSort } = filterSlice.actions;
export default filterSlice.reducer;
