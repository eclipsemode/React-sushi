import {createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {fetchPromocodeCheck} from "../api";
import {setMaterialDialog} from "../../materialDialog/api";
import {MaterialDialogTypes} from "../../materialDialog/model";

const promoCodeMiddleware = createListenerMiddleware();

promoCodeMiddleware.startListening({
    matcher: isAnyOf(fetchPromocodeCheck.fulfilled, fetchPromocodeCheck.rejected),
    effect: async (action, listenerApi) => {
        if (action.meta.requestStatus === 'fulfilled') {
            listenerApi.dispatch(setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.PROMOCODE_SUCCESS
            }))
        } else {
            listenerApi.dispatch(setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.PROMOCODE_INVALID
            }))
        }

    }
})

export default promoCodeMiddleware;