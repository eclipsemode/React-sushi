import {store} from '@store/index'
import locationReducer, {setCurrentBranch, setAllBranches, IBranches} from '@store/features/location/api'
import {PayloadAction} from "@reduxjs/toolkit";

describe('locationReducer tests', () => {

    const defaultState = {
        currentBranch: 'Армавир',
        allBranches: [],
        branchLoadSaveProcess: false
    }

    it('Should test with empty action', () => {
        const result = locationReducer(undefined, { type: '' });
        expect(result).toEqual(defaultState);
    })

    it('Should test default value', () => {
        const state: RootState = store.getState();

        expect(state.locationReducer).toEqual(defaultState)
    })

    it('Should test "setCurrentBranch" action', () => {
        const action: PayloadAction<string> = {type: setCurrentBranch.type, payload: 'Test'};
        const result = locationReducer(defaultState, action);

        expect(result.currentBranch).toBe('Test');
        expect(result.branchLoadSaveProcess).toBe(false);
    })

    it('Should test "setAllBranches" action', () => {
        const action: PayloadAction<IBranches[]> = {type: setAllBranches.type, payload: [{ id: 1, name: 'Test' }]};
        const result = locationReducer(defaultState, action);

        expect(String(result.allBranches[0].name)).toBe('Test');
        expect(result.branchLoadSaveProcess).toBe(false);
    })
});