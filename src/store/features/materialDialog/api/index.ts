import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store/index";
import {MaterialDialogTypes} from "../model";
import {IProduct} from "@store/features/products/api";

export interface IMaterialDialog<T> {
    opened: boolean,
    dialogType: MaterialDialogTypes | null,
    data?: T,
    applyCallback?: boolean
}


const initialState: IMaterialDialog<IProduct[]> = {
    opened: false,
    dialogType: null,
    data: undefined,
    applyCallback: false
}

export const materialDialogSlice = createSlice({
    name: 'materialDialog',
    initialState,
    reducers: {
        setMaterialDialog: <T>(state: IMaterialDialog<T>, action: PayloadAction<IMaterialDialog<T>>) => {
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
        }
    }
})

export const selectMaterialDialog = (state: RootState) => state.materialDialogReducer;

export const {setMaterialDialog,clearMaterialDialog, } = materialDialogSlice.actions;

export default materialDialogSlice.reducer;