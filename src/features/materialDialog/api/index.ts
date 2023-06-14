import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import {MaterialDialogTypes} from "../model";

export interface IMaterialDialog {
    opened: boolean,
    dialogType: MaterialDialogTypes | null,
    data?: any | null
}


const initialState: IMaterialDialog = {
    opened: false,
    dialogType: null,
    data: null
}

export const materialDialogSlice = createSlice({
    name: 'materialDialog',
    initialState,
    reducers: {
        setMaterialDialog: (state: Draft<IMaterialDialog>, action: PayloadAction<IMaterialDialog>) => {
            state.dialogType = action.payload.dialogType;
            state.opened = action.payload.opened;
            state.data = action.payload.data ?? null;
        }
    }
})

export const selectMaterialDialog = (state: RootState) => state.materialDialogReducer;

export const {setMaterialDialog} = materialDialogSlice.actions;

export default materialDialogSlice.reducer;