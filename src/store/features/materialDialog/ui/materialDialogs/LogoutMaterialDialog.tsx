import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Colors from '@shared/utils/Colors';
import SimpleButton from '@shared/UI/SimpleButton';
import { setMaterialDialog } from '../../api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useRouter } from 'next/navigation';
import menuPath from '@shared/utils/menuPath';
import { selectUser } from '@store/features/user/api';
import { logout } from '@store/features/auth/api';

const LogoutMaterialDialog = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const router = useRouter();

  const callback = () => {
    dispatch(
      logout({
        userId: user?.id || '',
      })
    );
    router.push(menuPath.HOME);
  };

  const handleAgree = () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );

    callback();
  };

  const handleDisagree = () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title">
        Вы уверены что хотите выйти?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Подтвердите выход из аккаунта нажав на соответствующую кнопку ниже.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <SimpleButton
          clickEvent={handleDisagree}
          color={Colors.$mainColor}
          variant="contained"
        >
          Отменить
        </SimpleButton>
        <SimpleButton clickEvent={handleAgree} variant="contained">
          Подтвердить
        </SimpleButton>
      </DialogActions>
    </>
  );
};

export default LogoutMaterialDialog;
