import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import { MaterialDialogTypes } from '../model';

export interface IMaterialDialogState {
  opened: boolean;
  dialogType: MaterialDialogTypes | null;
  data?: any;
  applyCallback?: boolean;
}

const initialState: IMaterialDialogState = {
  opened: false,
  dialogType: null,
  data: undefined,
  applyCallback: false,
};

const materialDialogSlice = createSlice({
  name: 'materialDialog',
  initialState,
  reducers: {
    setMaterialDialog: (
      state: IMaterialDialogState,
      action: PayloadAction<IMaterialDialogState>
    ) => {
      state.dialogType = action.payload.dialogType;
      state.opened = action.payload.opened;
      state.data = action.payload.data ?? undefined;
      state.applyCallback = action.payload.applyCallback ?? false;
    },
    clearMaterialDialog: (state) => {
      state.dialogType = null;
      state.opened = false;
      state.data = undefined;
      state.applyCallback = false;
    },
  },
});

export const selectMaterialDialog = (state: RootState) =>
  state.materialDialogReducer;

export const { setMaterialDialog, clearMaterialDialog } =
  materialDialogSlice.actions;

export default materialDialogSlice.reducer;
