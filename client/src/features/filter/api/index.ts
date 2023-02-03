import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export enum SortType {
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
  searchValue?: string;
  sortType: SortType;
  sortOrder: SortOrderType;
  categoryNumber: number;
};

const initialState: IFilterState = {
  sortId: 0,
  searchValue: '',
  sortType: SortType.RATING,
  sortOrder: SortOrderType.ASC,
  categoryNumber: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    clearSearchValue: (state) => {
      state.searchValue = '';
    },
    setSortId: (state, action: PayloadAction<number>) => {
      state.sortId = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrderType>) => {
      state.sortOrder = action.payload;
    },
    setCategoryNumber: (state, action: PayloadAction<number>) => {
      state.categoryNumber = Number(action.payload);
    },
  },
});

export const selectFilter = (state: RootState) => state.filterReducer;
export const { setSearchValue, clearSearchValue, setSortId, setSortType, setSortOrder, setCategoryNumber } =
  filterSlice.actions;
export default filterSlice.reducer;
