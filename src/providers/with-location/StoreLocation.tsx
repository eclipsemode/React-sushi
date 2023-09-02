'use client'
import React from 'react';
import {usePosition} from "../../hooks/usePosition";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {IBranches, selectLocation, setAllBranches, setCurrentBranch} from "@store/features/location/api";
import readCookie from "@shared/utils/readCookie";

interface IProps {
    branches: IBranches[]
}

const StoreLocation = ({branches}: IProps) => {

    const {city} = usePosition();
    const dispatch = useAppDispatch();
    const {allBranches} = useAppSelector(selectLocation);

    React.useEffect(() => {
        dispatch(setAllBranches(branches));
    }, [branches, dispatch])

    React.useEffect(() => {
        const locationCookie = readCookie('location-initial');
        let foundBranchData;
        if (locationCookie) {
            foundBranchData = allBranches.find((branch: IBranches) => branch.id === +locationCookie);
        }

        if (city && allBranches) {
            const foundCity = branches.find(obj => obj.name.toLowerCase() === city.toLowerCase())?.name;
            dispatch(setCurrentBranch(foundCity || foundBranchData?.name || branches[0]?.name));
        }
    }, [allBranches, branches, city, dispatch])



    return <></>
};

export default StoreLocation;