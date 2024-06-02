import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addItem,
  removeAll,
  removeItem,
  removeItemBySizeId,
  setPizzaPromotion,
  updateDeliveryPrice,
  calculatePriceAndAmount,
} from '@store/features/cart/api';

const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem, removeAll, removeItemBySizeId),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(calculatePriceAndAmount());
    listenerApi.dispatch(setPizzaPromotion());
    listenerApi.dispatch(updateDeliveryPrice());
  },
});

export default cartListenerMiddleware;
