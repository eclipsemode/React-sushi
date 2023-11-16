'use client';
import React from 'react';
import { usePosition } from '@hooks/usePosition';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  IBranches,
  selectLocation,
  setAllBranches,
  setCurrentBranch,
} from '@store/features/location/api';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';


interface IProps {
  branches: IBranches[];
  locationInitialCookie: RequestCookie | undefined,
  children: React.ReactNode
}

const WithLocation = ({ branches, locationInitialCookie, children}: IProps) => {

  const { city } = usePosition();
  const dispatch = useAppDispatch();
  const { allBranches } = useAppSelector(selectLocation);

  React.useEffect(() => {
    dispatch(setAllBranches(branches));
    dispatch(setCurrentBranch(branches[0]?.name));
  }, [branches, dispatch]);

  React.useEffect(() => {
    let foundBranchData;
    if (locationInitialCookie?.value) {
      foundBranchData = allBranches.find(
        (branch: IBranches) => branch.id === +locationInitialCookie.value
      );
    }

    if (city && allBranches) {
      const foundCity = branches.find(
        (obj) => obj.name.toLowerCase() === city.toLowerCase()
      )?.name;
      dispatch(
        setCurrentBranch(
          foundCity || foundBranchData?.name || branches[0]?.name
        )
      );
    }
  }, [allBranches, branches, city, dispatch]);

  return <>{children}</>;
};

export default WithLocation;
