import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import { setMaterialDialog } from '../../api';
import { useAppDispatch } from '@store/hooks';
import Colors from '@shared/utils/Colors';

const PromocodeInvalid = () => {
  const dispatch = useAppDispatch();

  const handleAgree = () => {
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
        Промокод недоступен
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Пожалуйста, попробуйте другой промокод.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <SimpleButton
          color={Colors.$mainColor}
          clickEvent={handleAgree}
          variant="contained"
        >
          Закрыть
        </SimpleButton>
      </DialogActions>
    </>
  );
};

export default PromocodeInvalid;
