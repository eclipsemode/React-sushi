'use client';
import React from 'react';
import {selectCart} from '@store/features/cart/api';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {
    DeviceType,
    selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import {selectBranch} from '@store/features/branch/api';
import {setMaterialDialog} from '@store/features/materialDialog/api';
import {MaterialDialogTypes} from '@store/features/materialDialog/model';
import {setCookie} from '@shared/utils/Cookie';
import MobileHeader from '@components/Header/MobileHeader';
import DesktopHeader from '@components/Header/DesktopHeader';
import {selectAuth} from '@store/features/auth/api';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const {currentBranch} = useAppSelector(selectBranch);
    const {totalPrice} = useAppSelector(selectCart);
    const {user} = useAppSelector((state) => state.userReducer);
    const {isAuth} = useAppSelector(selectAuth);
    const {deviceType} = useAppSelector(selectAdaptiveServiceSlice);


    const handleAgreePopover = () => {
        if (currentBranch) {
            setCookie('branch-initial', currentBranch?.id, 1);
        }
    };

    const onCityPickClick = () => {
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
            currentBranch={currentBranch}
            handleAgreePopover={handleAgreePopover}
            onCityPickClick={onCityPickClick}
        />
    ) : (
        <MobileHeader
            totalPrice={totalPrice}
            currentBranch={currentBranch}
            handleAgreePopover={handleAgreePopover}
            onCityPickClick={onCityPickClick}
        />
    );
};

export default Header;
