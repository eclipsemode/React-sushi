import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addItem,
  removeAll,
  removeItem,
  removeItemById,
  setFinalPrice,
  updateDeliveryPrice
} from "@store/features/cart/api";

const cartListenerMiddleware = createListenerMiddleware()

cartListenerMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem, removeAll, removeItemById, setFinalPrice),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(updateDeliveryPrice());
  },
})

export default cartListenerMiddleware;