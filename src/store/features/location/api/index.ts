import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IBranches {
    id: number,
    name: string
}

export interface ILocationState {
    currentBranch: string,
    allBranches: IBranches[],
    branchLoadSaveProcess: boolean
}

const initialState: ILocationState = {
    currentBranch: 'Армавир',
    allBranches: [],
    branchLoadSaveProcess: false
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setCurrentBranch: (state, action: PayloadAction<string>) => {
            state.currentBranch = action.payload
        },
        setAllBranches: (state, action: PayloadAction<IBranches[]>) => {
            state.allBranches = action.payload
        }
    }
})

export const selectLocation = (state: RootState) => state.locationReducer;

export const {setCurrentBranch, setAllBranches} = locationSlice.actions;
export default locationSlice.reducer;