import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$api_guest} from "@services/api";

export type BranchesType = 'Армавир'

interface IBranches {
    id: number,
    name: BranchesType
}

export interface ILocationState {
    currentBranch: BranchesType,
    allBranches: IBranches[],
    branchLoadSaveProcess: boolean
}

const initialState: ILocationState = {
    currentBranch: 'Армавир',
    allBranches: [],
    branchLoadSaveProcess: false
}

export const getBranches = createAsyncThunk<IBranches[], void>(
    'location/getBranches',
    async (_, {rejectWithValue}) => {
        try {
            const res = await $api_guest.get('api/branch/');
            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setCurrentBranch: (state, action: PayloadAction<BranchesType>) => {
            state.currentBranch = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBranches.pending, (state) => {
                state.branchLoadSaveProcess = true;
            })
            .addCase(getBranches.fulfilled, (state, action: PayloadAction<IBranches[]>) => {
                state.allBranches = action.payload;
                state.branchLoadSaveProcess = false;
            })
            .addCase(getBranches.rejected, (state) => {
                state.branchLoadSaveProcess = false;
            })
    }
})

export const selectLocation = (state: RootState) => state.locationReducer;

export const {setCurrentBranch} = locationSlice.actions;
export default locationSlice.reducer;