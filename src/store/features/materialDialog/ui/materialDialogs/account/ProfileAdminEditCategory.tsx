import React from 'react';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CustomInput from "@shared/UI/CustomInput";
import InputFile from '@shared/UI/InputFile';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { changeCategory, fetchCategories } from '@store/features/categories/api';
import { enqueueSnackbar } from 'notistack';
import {
  selectMaterialDialog,
  setMaterialDialog,
} from '@store/features/materialDialog/api';
import { ICreateCategoryForm } from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminAddCategory';
import Image from 'next/image';

const ProfileAdminEditCategory = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMaterialDialog);
  const { register, handleSubmit } = useForm<ICreateCategoryForm>({
    defaultValues: {
      name: data.name || '',
    },
  });
  const success = async () => {
    await dispatch(fetchCategories());
  };

  const callback = async (formData: ICreateCategoryForm) => {
    try {
      const fileImage = formData.image[0];
      await dispatch(
        changeCategory({ id: data.id, name: formData.name, image: fileImage })
      ).unwrap();
      enqueueSnackbar('Категория успешно изменена!', { variant: 'success' });
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Ошибка изменения категории, попробуйте позднее', {
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
        Изменение категории
      </DialogTitle>
      <form onSubmit={handleSubmit(handleAgree)} onReset={handleDisagree}>
        <DialogContent>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              position: 'relative',
              width: '100%',
              height: '50px',
            }}
          >
            <Image
              src={`${process.env.REACT_APP_API_URL}/images/category/${data.image}`}
              style={{ objectFit: 'contain' }}
              fill
              alt="category-image"
            />
          </div>
          <CustomInput register={register} name="name" required />
          <InputFile register={register} name="image" />
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

export default ProfileAdminEditCategory;
