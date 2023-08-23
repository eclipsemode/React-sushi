import {store} from '@store/index'
import authReducer, {fetchAuth, signIn} from '@store/features/auth/api'

describe('citySlice reducer', () => {

    const defaultState = {
        error: false,
        authLoadSaveProcess: false
    }

    it('Should test with empty action', () => {
        const result = authReducer(undefined, {type: ''});
        expect(result).toEqual(defaultState);
    })

    it('Should test default value', () => {
        const state: RootState = store.getState();

        expect(state.authReducer).toEqual(defaultState)
    })

    it('Should test "fetchAuth" pending', () => {
        const action = {type: fetchAuth.pending.type};
        const result = authReducer(defaultState, action);
        expect(result).toEqual({...defaultState, authLoadSaveProcess: true});

    })

    it('Should test "fetchAuth" fulfilled', () => {
        const action = {type: fetchAuth.fulfilled.type};
        const result = authReducer(defaultState, action);
        expect(result).toEqual({...defaultState, authLoadSaveProcess: false});
    })

    it('Should test "fetchAuth" rejected', () => {
        const action = {type: fetchAuth.rejected.type};
        const result = authReducer(defaultState, action);
        expect(result).toEqual({ error: true, authLoadSaveProcess: false});
    })

    it('Should test "signIn" pending', () => {
        const action = {type: signIn.pending.type};
        const result = authReducer(defaultState, action);
        expect(result).toEqual({...defaultState, authLoadSaveProcess: true});

    })
});