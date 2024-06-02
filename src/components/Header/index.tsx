'use client';
import React, { useEffect } from 'react';
import { selectCart } from '@store/features/cart/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import { IBranch, selectBranch } from '@store/features/branch/api';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { usePosition } from '@hooks/usePosition';
import { checkCookieExpire, setCookie } from '@shared/utils/Cookie';
import MobileHeader from '@components/Header/MobileHeader';
import DesktopHeader from '@components/Header/DesktopHeader';
import { selectAuth } from '@store/features/auth/api';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentBranch, allBranches } = useAppSelector(selectBranch);
  const { totalPrice } = useAppSelector(selectCart);
  const { user } = useAppSelector((state) => state.userReducer);
  const { isAuth } = useAppSelector(selectAuth);
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const { city } = usePosition();
  const [openedPopover, setOpenedPopover] = React.useState<boolean>(false);
  const popoverRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let branchExists: IBranch | undefined = allBranches.find(
      (branch: IBranch) => branch.name === city
    );

    if (
      !checkCookieExpire('branch-initial') &&
      allBranches &&
      city &&
      (!isAuth || !branchExists)
    ) {
      setOpenedPopover(true);
    }
  }, [allBranches, city, isAuth]);

  const handleClosePopover = () => {
    setOpenedPopover(false);
  };

  const handleAgreePopover = () => {
    setOpenedPopover(false);
    if (currentBranch) {
      setCookie('branch-initial', currentBranch?.id, 1);
    }
  };

  const onCityPickClick = () => {
    if (openedPopover) {
      setOpenedPopover(false);
    }
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.HEADER_PICK_CITY,
      })
    );
  };

  return deviceType === DeviceType.DESKTOP ? (
    <DesktopHeader
      totalPrice={totalPrice}
      isAuth={isAuth}
      user={user}
      openedPopover={openedPopover}
      popoverRef={popoverRef}
      handleClosePopover={handleClosePopover}
      currentBranch={currentBranch}
      handleAgreePopover={handleAgreePopover}
      onCityPickClick={onCityPickClick}
    />
  ) : (
    <MobileHeader
      totalPrice={totalPrice}
      openedPopover={openedPopover}
      popoverRef={popoverRef}
      handleClosePopover={handleClosePopover}
      currentBranch={currentBranch}
      handleAgreePopover={handleAgreePopover}
      onCityPickClick={onCityPickClick}
    />
  );
};

export default Header;
