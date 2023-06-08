import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import {MaterialDialogTypes} from "../model";

export interface IMaterialDialog {
    opened: boolean,
    dialogType: MaterialDialogTypes | null
}


const initialState: IMaterialDialog = {
    opened: false,
    dialogType: null
}

export const materialDialogSlice = createSlice({
    name: 'materialDialog',
    initialState,
    reducers: {
        setMaterialDialog: (state, action: PayloadAction<IMaterialDialog>) => {
            state.dialogType = action.payload.dialogType;
            state.opened = action.payload.opened;
        }
    }
})

export const selectMaterialDialog = (state: RootState) => state.materialDialogReducer;

export const {setMaterialDialog} = materialDialogSlice.actions;

export default materialDialogSlice.reducer;