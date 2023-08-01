import {store} from '@store/index'
import authReducer from '@store/features/auth/api'
import {AnyAction} from "redux";

describe('citySlice reducer', () => {
    it('Should test default value', () => {
        const state: RootState = store.getState();

        expect(state.authReducer).toEqual(authReducer(undefined, {} as AnyAction))
    })
});