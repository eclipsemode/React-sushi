'use client'
import React from 'react';
import {usePosition} from "../../hooks/usePosition";
import {useAppDispatch} from "@store/hooks";
import {IBranches, setAllBranches, setCurrentBranch} from "@store/features/location/api";

interface IProps {
    branches: IBranches[]
}

const StoreLocation = ({branches}: IProps) => {

    const {city} = usePosition();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setAllBranches(branches));
    }, [branches, dispatch])

    React.useEffect(() => {
        if (city) {
            const foundCity = branches.find(obj => obj.name.toLowerCase() === city.toLowerCase())?.name;
            dispatch(setCurrentBranch(foundCity || branches[0].name));
        }
    }, [branches, city, dispatch])



    return <></>
};

export default StoreLocation;