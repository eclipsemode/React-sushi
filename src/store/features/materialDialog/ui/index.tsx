'use client';
import { Dialog, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Colors from '@shared/utils/Colors';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectMaterialDialog, setMaterialDialog } from '../api';
import { MaterialDialogTypes } from '../model';
import LogoutMaterialDialog from './materialDialogs/LogoutMaterialDialog';
import ClearCartMaterialDialog from './materialDialogs/ClearCartMaterialDialog';
import SendOrderMaterialDialog from './materialDialogs/SendOrderMaterialDialog';
import PromocodeSuccess from './materialDialogs/PromocodeSuccess';
import PromocodeInvalid from './materialDialogs/PromocodeInvalid';
import ProfileSendSettings from './materialDialogs/ProfileSendSettings';
import ProfileResetSettings from './materialDialogs/account/ProfileResetSettings';
import ProfileAdminAddProduct from './materialDialogs/account/ProfileAdminAddProduct';
import ProfileAdminDeleteProduct from './materialDialogs/account/ProfileAdminDeleteProduct';
import ProfileAdminEditProduct from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminEditProduct';
import ProfileAdminDeleteCategory
  from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminDeleteCategory';
import ProfileAdminAddCategory from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminAddCategory';
import ProfileAdminEditCategory
  from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminEditCategory';
import ProfileAdminAddPromocode
  from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminAddPromocode';
import ProfileAdminChangePromocode
  from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminChangePromocode';
import ProfileAdminDeletePromocode
  from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminDeletePromocode';
import HeaderPickCity from '@store/features/materialDialog/ui/materialDialogs/header/HeaderPickCity';
import React from 'react';

const MaterialDialog = () => {
  const { opened, dialogType } = useAppSelector(selectMaterialDialog);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
        data: null,
      }),
    );
  };

  const renderMaterialDialogItem = (): React.ReactNode => {
    switch (dialogType) {
      case MaterialDialogTypes.LOGOUT:
        return <LogoutMaterialDialog />;
      case MaterialDialogTypes.CLEAR_CART:
        return <ClearCartMaterialDialog />;
      case MaterialDialogTypes.SEND_ORDER_DELIVERY:
        return <SendOrderMaterialDialog />;
      case MaterialDialogTypes.SEND_ORDER_PICKUP:
        return <SendOrderMaterialDialog />;
      case MaterialDialogTypes.PROMOCODE_INVALID:
        return <PromocodeInvalid />;
      case MaterialDialogTypes.PROMOCODE_SUCCESS:
        return <PromocodeSuccess />;
      case MaterialDialogTypes.PROFILE_SETTINGS_SEND:
        return <ProfileSendSettings />;
      case MaterialDialogTypes.PROFILE_SETTINGS_RESET:
        return <ProfileResetSettings />;
      case MaterialDialogTypes.PROFILE_ADMIN_ADD_PRODUCT:
        return <ProfileAdminAddProduct />;
      case MaterialDialogTypes.PROFILE_ADMIN_DELETE_PRODUCT:
        return <ProfileAdminDeleteProduct />;
      case MaterialDialogTypes.PROFILE_ADMIN_EDIT_PRODUCT:
        return <ProfileAdminEditProduct />;
      case MaterialDialogTypes.PROFILE_ADMIN_DELETE_CATEGORY:
        return <ProfileAdminDeleteCategory />;
      case MaterialDialogTypes.PROFILE_ADMIN_ADD_CATEGORY:
        return <ProfileAdminAddCategory />;
      case MaterialDialogTypes.PROFILE_ADMIN_EDIT_CATEGORY:
        return <ProfileAdminEditCategory />;
      case MaterialDialogTypes.PROFILE_ADMIN_ADD_PROMOCODE:
        return <ProfileAdminAddPromocode />;
      case MaterialDialogTypes.PROFILE_ADMIN_CHANGE_PROMOCODE:
        return <ProfileAdminChangePromocode />;
      case MaterialDialogTypes.PROFILE_ADMIN_DELETE_PROMOCODE:
        return <ProfileAdminDeletePromocode />;
      case MaterialDialogTypes.HEADER_PICK_CITY:
        return <HeaderPickCity />;

      default:
        return <></>;
    }
  };

  return (
    <Dialog
      sx={{
        ' > .MuiDialog-container > .MuiPaper-root': {
          background: Colors.$rootCardBackground,
          borderRadius: '12px',
          padding: '25px',
        },
        ' h2': {
          color: Colors.$rootText,
        },
        ' p': {
          color: Colors.$rootText,
        },
      }}
      disableScrollLock
      fullScreen={fullScreen}
      open={opened}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      {renderMaterialDialogItem()}
    </Dialog>
  );
};

export default MaterialDialog;
