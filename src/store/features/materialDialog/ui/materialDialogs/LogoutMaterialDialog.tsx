import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Colors from '@shared/utils/Colors';
import SimpleButton from '@shared/UI/SimpleButton';
import { setMaterialDialog } from '../../api';
import { useAppDispatch } from '@store/hooks';
import { fetchUserLogout } from '@store/features/logout/api';
import { useRouter } from 'next/navigation';
import menuPath from '@shared/utils/menuPath';

const LogoutMaterialDialog = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const callback = () => {
    dispatch(fetchUserLogout());
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
