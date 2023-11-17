'use client';
import React from 'react';
import { selectCart } from '@store/features/cart/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import { IBranches, selectLocation } from '@store/features/location/api';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { usePosition } from '@hooks/usePosition';
import { checkCookieExpire, setCookie } from '@shared/utils/Cookie';
import MobileHeader from '@components/Header/MobileHeader';
import DesktopHeader from '@components/Header/DesktopHeader';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentBranch, allBranches } = useAppSelector(selectLocation);
  const { totalPrice } = useAppSelector(selectCart);
  const { isAuth, user } = useAppSelector((state) => state.userReducer);
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const { city } = usePosition();
  const [openedPopover, setOpenedPopover] = React.useState<boolean>(false);
  const popoverRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let branchExists: IBranches | undefined = allBranches.find((branch: IBranches) => branch.name === city);

    if (
      !checkCookieExpire('location-initial') &&
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
    const currentBranchData = allBranches.find(
      (branch: IBranches) => branch.name === currentBranch,
    );
    setOpenedPopover(false);
    setCookie('location-initial', String(currentBranchData?.id || ''), 1);
  };

  const onCityPickClick = () => {
    if (openedPopover) {
      setOpenedPopover(false);
    }
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.HEADER_PICK_CITY,
      }),
    );
  };

  return deviceType === DeviceType.DESKTOP
    ? <DesktopHeader
      totalPrice={totalPrice}
      isAuth={isAuth}
      user={user}
      openedPopover={openedPopover}
      popoverRef={popoverRef}
      handleClosePopover={handleClosePopover}
      currentBranch={currentBranch}
      handleAgreePopover={handleAgreePopover}
      onCityPickClick={onCityPickClick} />
    : <MobileHeader
      totalPrice={totalPrice}
      openedPopover={openedPopover}
      popoverRef={popoverRef}
      handleClosePopover={handleClosePopover}
      currentBranch={currentBranch}
      handleAgreePopover={handleAgreePopover}
      onCityPickClick={onCityPickClick} />;
};

export default Header;
