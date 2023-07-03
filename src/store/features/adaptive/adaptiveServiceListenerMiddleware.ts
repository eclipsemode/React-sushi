import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setDeviceType, setCurrentWindowInnerWidth } from '@store/features/adaptive';

const adaptiveServiceListenerMiddleware = createListenerMiddleware();

adaptiveServiceListenerMiddleware.startListening({
    matcher: isAnyOf(setCurrentWindowInnerWidth),
    effect: (_action, listenerApi) => {
        listenerApi.dispatch(setDeviceType());
    },
});

export default adaptiveServiceListenerMiddleware;
