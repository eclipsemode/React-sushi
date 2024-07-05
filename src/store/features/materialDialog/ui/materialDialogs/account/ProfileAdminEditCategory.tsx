import React from 'react';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CustomInput from '@shared/UI/CustomInput';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  changeCategory,
  changeCategoryImage,
  getCategories,
} from '@store/features/categories/api';
import { enqueueSnackbar } from 'notistack';
import {
  selectMaterialDialog,
  setMaterialDialog,
} from '@store/features/materialDialog/api';
import { ICreateCategoryForm } from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminAddCategory';
import ImagePicker from '@components/Account/Admin/Products/ImagePicker';

export interface IChangeCategoryForm
  extends Omit<ICreateCategoryForm, 'image'> {
  image?: FileList;
}

const ProfileAdminEditCategory = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMaterialDialog);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateCategoryForm>({
    defaultValues: {
      name: data.name || '',
    },
  });
  const success = async () => {
    await dispatch(getCategories());
  };

  const callback = async (formData: IChangeCategoryForm) => {
    try {
      const fileImage = formData.image?.item(0);
      await dispatch(
        changeCategory({ id: data.id, name: formData.name })
      ).unwrap();

      if (fileImage) {
        await dispatch(
          changeCategoryImage({ id: data.id, image: fileImage })
        ).unwrap();
      }
      enqueueSnackbar('Категория успешно изменена!', { variant: 'success' });
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Ошибка изменения категории, попробуйте позднее', {
        variant: 'error',
      });
    }
    await success();
  };

  const handleAgree: SubmitHandler<IChangeCategoryForm> = async (formData) => {
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
        <DialogContent
          style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}
        >
          <ImagePicker
            required={false}
            imgFileList={watch('image')}
            register={register}
            error={errors.image}
            defaultValueSrc={`${process.env.REACT_APP_API_URL}images/category/${data.image}`}
          />
          <CustomInput register={register} name="name" required />
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
