import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setDeviceType, setCurrentWindowInnerWidth } from 'processes/services/adaptiveService/adaptiveService';

const adaptiveServiceListenerMiddleware = createListenerMiddleware();

adaptiveServiceListenerMiddleware.startListening({
    matcher: isAnyOf(setCurrentWindowInnerWidth),
    effect: (_action, listenerApi) => {
        listenerApi.dispatch(setDeviceType());
    },
});

export default adaptiveServiceListenerMiddleware;
