import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import {SortNameType} from "@store/features/filter/model";

export enum SortType {
  ORDER_INDEX = 'orderIndex',
  RATING = 'rating',
  PRICE = 'price',
  NAME = 'name',
}
export enum SortOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IFilterState {
  sortId: number;
  sortType: SortType;
  sortOrder: SortOrderType;
  categoryNumber: number;
}

const initialState: IFilterState = {
  sortId: 0,
  sortType: SortType.ORDER_INDEX,
  sortOrder: SortOrderType.ASC,
  categoryNumber: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortNameType>) => {
      state.sortId = action.payload.id;
      state.sortType = action.payload.sortType;
      state.sortOrder = action.payload.orderType;
    },
    setCategoryNumber: (state, action: PayloadAction<number>) => {
      state.categoryNumber = Number(action.payload);
    },
  },
});

export const selectFilter = (state: RootState) => state.filterReducer;
export const { setCategoryNumber, setSort } =
  filterSlice.actions;
export default filterSlice.reducer;
