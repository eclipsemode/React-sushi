import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setMaterialDialog } from '../../../api';
import { enqueueSnackbar } from 'notistack';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createProduct, getProducts } from '@store/features/products/api';
import CustomInput from '@shared/UI/CustomInput';
import React, { CSSProperties } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select from '@shared/UI/Select';
import { ICreateProduct } from '@store/features/products/model';
import ImagePicker from '@components/Account/Admin/Products/ImagePicker';

export interface ICreateProductForm
  extends Omit<
    ICreateProduct,
    'image' | 'productPrices' | 'productSizes' | 'productSkus'
  > {
  image: FileList;
  price1: number;
  price2: number;
  price3: number;
  sku1: string;
  sku2: string;
  sku3: string;
  size1: string;
  size2: string;
  size3: string;
}

const rowStyle: CSSProperties = {
  marginTop: '10px',
};

const ProfileAdminAddProduct = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateProductForm>();
  const [amountPizzaSize, setAmountPizzaSize] = React.useState<number>(1);
  const success = () => {
    dispatch(getProducts());
  };

  const callback = async (data: ICreateProductForm) => {
    try {
      const fileImage: File | null = data.image.item(0);

      const productSizes = [data.size1, data.size2, data.size3].filter(
        (x) => x !== undefined
      );
      const productPrices = [data.price1, data.price2, data.price3].filter(
        (x) => x !== undefined
      );
      const productSkus = [data.sku1, data.sku2, data.sku3].filter(
        (x) => x !== undefined
      );

      const reqData: ICreateProduct = {
        isPizza: data.isPizza,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        ...(fileImage && { image: fileImage }),
        rating: Number(data.rating),
        productSizes,
        productPrices,
        productSkus,
      };

      await dispatch(createProduct(reqData)).unwrap();
      reset();
      success();
      enqueueSnackbar('Позиция успешно добавлена!', { variant: 'success' });
    } catch (e: any) {
      console.error(e);
      enqueueSnackbar(e.description, {
        variant: 'error',
      });
    }
  };

  const handleAgree: SubmitHandler<ICreateProductForm> = async (
    data: ICreateProductForm
  ) => {
    await callback(data);
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

  const renderSelectType = () => (
    <Box sx={{ minWidth: 120 }}>
      <Select register={register} name="isPizza" defaultValue="false">
        <option value={'false'}>Другое</option>
        <option value={'true'}>Пицца</option>
      </Select>
    </Box>
  );

  const getAmountPizzaSizeArr = () => {
    const sizeArr: number[] = [];
    for (let i = 1; i < amountPizzaSize + 1; i++) {
      sizeArr.push(i);
    }

    return sizeArr;
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title">
        Введите информацию о товаре
      </DialogTitle>
      <form onSubmit={handleSubmit(handleAgree)} onReset={handleDisagree}>
        <DialogContent>
          <ImagePicker
            imgFileList={watch('image')}
            error={errors.image}
            register={register}
          />
          {renderSelectType()}
          <CustomInput
            required={true}
            label="Название"
            type="text"
            register={register}
            name="name"
            style={rowStyle}
          />
          <CustomInput
            label="Рейтинг"
            type="number"
            register={register}
            name="rating"
            style={rowStyle}
          />
          <CustomInput
            required={true}
            label="Описание"
            type="text"
            register={register}
            name="description"
            style={rowStyle}
          />
          <Select
            required={true}
            register={register}
            name="categoryId"
            style={rowStyle}
            defaultValue="0"
            validate={(value) => value !== '0'}
          >
            <>
              <option value={0} disabled>
                Выберите категорию
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </>
          </Select>

          {getAmountPizzaSizeArr().map((i) => (
            <Stack
              key={i}
              direction="row"
              sx={{ columnGap: '10px', alignItems: 'flex-end' }}
              style={rowStyle}
            >
              <span style={{ color: Colors.$rootText, fontSize: '16px' }}>
                {i}.
              </span>
              <CustomInput
                required={true}
                label="Размер"
                type="text"
                register={register}
                name={`size${i}`}
              />
              <CustomInput
                required={true}
                label="Цена"
                type="number"
                register={register}
                name={`price${i}`}
              />
              <CustomInput
                label="Артикул"
                type="text"
                register={register}
                name={`sku${i}`}
              />
              <RemoveCircleOutlineIcon
                color="error"
                sx={{
                  cursor: amountPizzaSize === 1 ? 'not-allowed' : 'pointer',
                  opacity: amountPizzaSize === 1 ? '0.5' : '1',
                }}
                onClick={() => {
                  if (amountPizzaSize === 1) return;
                  setAmountPizzaSize((prevState) => prevState - 1);
                }}
              />
            </Stack>
          ))}

          {amountPizzaSize < 3 && (
            <Stack
              direction="row"
              sx={{ alignItems: 'center', columnGap: '10px' }}
              style={rowStyle}
            >
              <AddCircleOutlineIcon
                color="success"
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (amountPizzaSize === 3) return;
                  setAmountPizzaSize((prevState) => prevState + 1);
                }}
              />
              <span style={{ color: Colors.$rootText, fontSize: '16px' }}>
                Добавить размер
              </span>
            </Stack>
          )}
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

export default ProfileAdminAddProduct;
