'use client';
import React from 'react';
import { usePosition } from '@hooks/usePosition';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  IBranch,
  selectBranch,
  setAllBranches,
  setCurrentBranch,
} from '@store/features/branch/api';

interface IProps {
  branches: IBranch[];
  cookieBranchId: string | undefined;
  children: React.ReactNode;
}

const WithLocation = ({ branches, children, cookieBranchId }: IProps) => {
  const { city } = usePosition();
  const dispatch = useAppDispatch();
  const { allBranches, currentBranch } = useAppSelector(selectBranch);

  React.useEffect(() => {
    dispatch(setAllBranches(branches));

    if (currentBranch) {
      dispatch(setCurrentBranch(currentBranch));
    } else {
      dispatch(setCurrentBranch(branches[0]));
    }
  }, [branches, dispatch]);

  React.useEffect(() => {
    if (city && allBranches) {
      let foundBranch: IBranch | undefined;

      if (cookieBranchId) {
        foundBranch = branches.find((branch) => branch.id === cookieBranchId);
      } else {
        foundBranch = branches.find(
          (branch) => branch.name.toLowerCase() === city.toLowerCase()
        );
      }
      dispatch(setCurrentBranch(foundBranch || branches[0]));
    }
  }, [allBranches, branches, city, dispatch]);

  return <>{children}</>;
};

export default WithLocation;
