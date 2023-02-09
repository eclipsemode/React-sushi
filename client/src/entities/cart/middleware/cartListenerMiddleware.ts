import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addItem, removeAll, removeItem, removeItemById, updateDeliveryPrice } from "entities/cart";

const cartListenerMiddleware = createListenerMiddleware()

cartListenerMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem, removeAll, removeItemById),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(updateDeliveryPrice());
  },
})

export default cartListenerMiddleware;