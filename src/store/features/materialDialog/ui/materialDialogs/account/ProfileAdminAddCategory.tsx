import React from 'react';
import { useAppDispatch } from '@store/hooks';
import { enqueueSnackbar } from 'notistack';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Colors from '@shared/utils/Colors';
import SimpleButton from '@shared/UI/SimpleButton';
import Input from '@shared/UI/input';
import { createCategory, fetchCategories } from '@store/features/categories';
import InputFile from '@shared/UI/InputFile';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface ICreateCategoryForm {
  image: FileList;
  name: string;
}

const ProfileAdminAddCategory = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<ICreateCategoryForm>();
  const success = async () => {
    await dispatch(fetchCategories());
  };

  const callback = async (formData: ICreateCategoryForm) => {
    try {
      const fileImage = formData.image[0];
      await dispatch(
        createCategory({ name: formData.name, image: fileImage })
      ).unwrap();
      enqueueSnackbar('Позиция успешно добавлена!', { variant: 'success' });
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Ошибка добавления товара, попробуйте позднее', {
        variant: 'error',
      });
    }
    await success();
  };

  const handleAgree: SubmitHandler<ICreateCategoryForm> = async (formData) => {
    await callback(formData);
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );
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
        Введите название категории
      </DialogTitle>
      <form onSubmit={handleSubmit(handleAgree)} onReset={handleDisagree}>
        <DialogContent>
          <Input register={register} name="name" required />
          <InputFile register={register} name="image" required />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <SimpleButton
            type="reset"
            color={Colors.$mainColor}
            variant="contained"
          >
            Отменить
          </SimpleButton>
          <SimpleButton type="submit" variant="contained">
            Подтвердить
          </SimpleButton>
        </DialogActions>
      </form>
    </>
  );
};

export default ProfileAdminAddCategory;
