import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { selectMaterialDialog, setMaterialDialog } from '../../api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { enqueueSnackbar } from 'notistack';
import { fetchPatchUserInfo, getUserData } from '@store/features/user/api';
import { useRouter } from 'next/navigation';
import menuPath from '@shared/utils/menuPath';

const ProfileSendSettings = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMaterialDialog);
  const router = useRouter();
  const { email, name, surname, street, house, floor, entrance, room } = data;

  const callback = async () => {
    try {
      await dispatch(
        fetchPatchUserInfo({
          email,
          name,
          surname,
          street,
          house,
          floor,
          entrance,
          room,
        })
      ).unwrap();
      await dispatch(getUserData());
      enqueueSnackbar('Данные успешно изменены!', { variant: 'success' });
      router.push(menuPath.ACCOUNT_MAIN);
    } catch (e) {
      enqueueSnackbar('Ошибка изменения данных!', { variant: 'error' });
    }
  };

  const handleAgree = async () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
        data: null,
      })
    );
    await callback();
  };

  const handleDisagree = () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
        data: null,
      })
    );
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title">
        Вы уверены что хотите изменить данные?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Подтвердите или отмените действие.
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

export default ProfileSendSettings;
