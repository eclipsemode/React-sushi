import { createSlice } from '@reduxjs/toolkit';

export enum City {
    ARMAVIR = 'Армавир',
}

export interface IInitialState {
    city: City;
}

const initialState: IInitialState = {
    city: City.ARMAVIR,
};
export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {},
});

export const selectCity = (state: RootState) => state.cityReducer;

export default citySlice.reducer;
