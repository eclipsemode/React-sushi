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


interface IProps {
  branches: IBranches[];
  children: React.ReactNode
}

const WithLocation = ({ branches, children}: IProps) => {
  const { city } = usePosition();
  const dispatch = useAppDispatch();
  const { allBranches, currentBranch } = useAppSelector(selectLocation);

  React.useEffect(() => {
    dispatch(setAllBranches(branches));

    if (currentBranch) {
      dispatch(setCurrentBranch(currentBranch))
    } else {
      dispatch(setCurrentBranch(branches[0]?.name));
    }
  }, [branches, dispatch]);

  React.useEffect(() => {
    let foundBranchData;
    if (currentBranch) {
      foundBranchData = allBranches.find(
        (branch: IBranches) => branch.name === currentBranch
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
