import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortType {
    RATING = 'rating',
    PRICE = 'price',
    NAME = 'name',
}
export enum SortOrderType {
    ASC = 'asc',
    DESC = 'desc',
}

export type FilterStateType = {
    sortId: number;
    searchValue?: string;
    sortType: SortType;
    sortOrder: SortOrderType;
    categoryNumber: number;
};

const initialState: FilterStateType = {
    sortId: 0,
    searchValue: '',
    sortType: SortType.RATING,
    sortOrder: SortOrderType.ASC,
    categoryNumber: 0,
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

export const selectFilter = (state: RootState) => state.filter;
export const { setSearchValue, clearSearchValue, setSortId, setSortType, setSortOrder, setCategoryNumber } =
    filterSlice.actions;
export default filterSlice.reducer;
