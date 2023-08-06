'use client'
import React from 'react';
import {usePosition} from "../../hooks/usePosition";
import {useAppDispatch} from "@store/hooks";
import {BranchesType, setCurrentBranch} from "@store/features/location/api";

const WithLocation = () => {
    const {city} = usePosition();
    const dispatch = useAppDispatch();
    
    React.useEffect(() => {
        if (city) {
            dispatch(setCurrentBranch(city as BranchesType));
        }
    }, [city, dispatch])

    return <></>
};

export default WithLocation;