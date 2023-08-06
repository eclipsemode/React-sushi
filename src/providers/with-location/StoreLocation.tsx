'use client'
import React from 'react';
import {usePosition} from "../../hooks/usePosition";
import {useAppDispatch} from "@store/hooks";
import {BranchesType, IBranches, setAllBranches, setCurrentBranch} from "@store/features/location/api";

interface IProps {
    branches: IBranches[]
}

const StoreLocation = ({branches}: IProps) => {

    const {city} = usePosition();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (city) {
            dispatch(setCurrentBranch(city as BranchesType));
        }
    }, [city, dispatch])

    React.useEffect(() => {
        dispatch(setAllBranches(branches));
    }, [branches, dispatch])

    return <></>
};

export default StoreLocation;