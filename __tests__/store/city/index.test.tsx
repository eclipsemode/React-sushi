import {store} from '@store/index'
import {City} from "@store/features/city";

describe('citySlice reducer', () => {
    it('Should test default value', () => {
        const state = store.getState().cityReducer;

        expect(state).toEqual({
            city: City.ARMAVIR,
        })
    })
});