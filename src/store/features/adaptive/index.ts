import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';

enum BreakPoints {
    LARGE = 1440,
    MEDIUM = 880,
    SMALL = 500,
}

export enum DeviceType {
    DESKTOP = 'desktop',
    TABLET = 'tablet',
    MOBILE = 'mobile',
}
export interface IInitialState {
    currentWindowInnerWidth: number | undefined;
    deviceType: DeviceType | undefined;
}

const initialState: IInitialState = {
    currentWindowInnerWidth: undefined,
    deviceType: undefined,
};

const adaptiveServiceSlice = createSlice({
    name: 'adaptiveService',
    initialState,
    reducers: {
        setDeviceType: (state) => {
            if (state.currentWindowInnerWidth) {
                if (state.currentWindowInnerWidth > BreakPoints.MEDIUM) {
                    state.deviceType = DeviceType.DESKTOP;
                } else if (
                    state.currentWindowInnerWidth > BreakPoints.SMALL &&
                    state.currentWindowInnerWidth <= BreakPoints.MEDIUM
                ) {
                    state.deviceType = DeviceType.TABLET;
                } else if (state.currentWindowInnerWidth <= BreakPoints.SMALL) {
                    state.deviceType = DeviceType.MOBILE;
                }
            }
        },
        setCurrentWindowInnerWidth: (state, action: PayloadAction<number>) => {
            state.currentWindowInnerWidth = action.payload;
        },
    },
});

export const selectAdaptiveServiceSlice = (state: RootState) => state.adaptiveServiceReducer;

export const { setDeviceType, setCurrentWindowInnerWidth } = adaptiveServiceSlice.actions;

export default adaptiveServiceSlice.reducer;
