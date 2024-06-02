import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

export interface IBranch {
  id: string;
  name: string;
}

export interface IBranchState {
  currentBranch: IBranch | null;
  allBranches: IBranch[];
  branchLoadSaveProcess: boolean;
}

const initialState: IBranchState = {
  currentBranch: null,
  allBranches: [],
  branchLoadSaveProcess: false,
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setCurrentBranch: (state, action: PayloadAction<IBranch>) => {
      state.currentBranch = action.payload;
    },
    setAllBranches: (state, action: PayloadAction<IBranch[]>) => {
      state.allBranches = action.payload;
    },
  },
});

export const selectBranch = (state: RootState) => state.branchReducer;

export const { setCurrentBranch, setAllBranches } = branchSlice.actions;
export default branchSlice.reducer;
