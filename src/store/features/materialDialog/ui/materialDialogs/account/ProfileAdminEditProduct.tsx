import React, { CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectMaterialDialog,
  setMaterialDialog,
} from '@store/features/materialDialog/api';
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
import { changeProduct, getProducts } from '@store/features/products/api';
import { enqueueSnackbar } from 'notistack';
import CustomInput from '@shared/UI/CustomInput';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select from '@shared/UI/Select';
import InputFile from '@shared/UI/InputFile';
import { IProduct, IProductSize } from '@store/features/products/model';
import { ICreateProductForm } from '@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminAddProduct';

const rowStyle: CSSProperties = {
  marginTop: '10px',
};

const ProfileAdminEditProduct = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMaterialDialog) as { data: IProduct };
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { register, reset, handleSubmit, watch, setValue } =
    useForm<ICreateProductForm>({
      defaultValues: {
        name: (!!data && data.name) || '',
        price1:
          (!!data &&
            data.productSize.length >= 1 &&
            data.productSize[0].price) ||
          undefined,
        price2:
          (!!data &&
            data.productSize.length > 1 &&
            data.productSize[1].price) ||
          undefined,
        price3:
          (!!data &&
            data.productSize.length > 2 &&
            data.productSize[2].price) ||
          undefined,
        isPizza: (!!data && data.isPizza) || false,
        sku1:
          (!!data && data.productSize.length >= 1 && data.productSize[0].sku) ||
          '',
        sku2:
          (!!data && data.productSize.length > 1 && data.productSize[1].sku) ||
          '',
        sku3:
          (!!data && data.productSize.length > 2 && data.productSize[2].sku) ||
          '',
        size1:
          (!!data &&
            data.productSize.length >= 1 &&
            data.productSize[0].name) ||
          '',
        size2:
          (!!data && data.productSize.length > 1 && data.productSize[1].name) ||
          '',
        size3:
          (!!data && data.productSize.length > 2 && data.productSize[2].name) ||
          '',
        rating: (!!data && data.rating) || undefined,
        description: (!!data && data.description) || '',
        categoryId: (!!data && data.categoryId) || undefined,
      },
    });
  const [amountPizzaSize, setAmountPizzaSize] = React.useState<number>(
    (!!data && data.productSize.length) || 1
  );

  const success = () => {
    dispatch(getProducts());
  };

  const callback = async (dataForm: ICreateProductForm) => {
    try {
      const productSizes = [dataForm.size1, dataForm.size2, dataForm.size3];
      const productPrices = [dataForm.price1, dataForm.price2, dataForm.price3];
      const productSkus = [dataForm.sku1, dataForm.sku2, dataForm.sku3];

      const newProductSize: IProductSize[] = [];

      productSizes.forEach((ps, index) => {
        if (ps) {
          newProductSize.push({
            productId: data.id || '',
            name: productSizes[index],
            price: productPrices[index],
            sku: productSkus[index],
          });
        }
      });

      const productChanged: IProduct = {
        id: data.id || '',
        name: dataForm.name,
        description: dataForm.description,
        categoryId: dataForm.categoryId,
        isPizza: dataForm.isPizza,
        rating: dataForm.rating,
        productSize: newProductSize,
      };

      await dispatch(changeProduct(productChanged)).unwrap();
      // const fileImage: File | null = dataForm.image.item(0);
      // if (dataForm.isPizza) {
      //   let newPrice: number[] = [];
      //   let newSku: string[] = [];
      //   let newSize: string[] = [];
      //
      //   for (let i = 1; i < amountPizzaSize + 1; i++) {
      //     // @ts-ignore
      //     newPrice.push(+dataForm[`price${i}`]);
      //     // @ts-ignore
      //     newSku.push(dataForm[`sku${i}`] ? dataForm[`sku${i}`] : null);
      //     // @ts-ignore
      //     newSize.push(dataForm[`size${i}`]);
      //   }
      //
      //   await dispatch(
      //     changeProduct({
      //       ...dataForm,
      //       id: (!!data && data.id) || '',
      //       price: newPrice,
      //       sku: newSku.length > 0 ? newSku : null,
      //       size: newSize.length > 0 ? newSize : null,
      //       image: fileImage,
      //     })
      //   ).unwrap();
      // } else {
      //   const priceArr = [dataForm.price1];
      //   await dispatch(
      //     changeProduct({
      //       ...dataForm,
      //       id: data[0].id || 0,
      //       price: priceArr,
      //       image: fileImage,
      //     })
      //   ).unwrap();
      // }

      reset();
      enqueueSnackbar('Позиция успешно изменена!', { variant: 'success' });
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Ошибка изменения товара, попробуйте позднее', {
        variant: 'error',
      });
    }
    success();
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
      <Select register={register} name="isPizza">
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
          {renderSelectType()}
          <CustomInput
            required={true}
            label="Название"
            type="text"
            register={register}
            name="name"
            style={rowStyle}
          />
          {!watch('isPizza') && (
            <CustomInput
              required={true}
              label="Цена"
              type="number"
              register={register}
              name="price1"
              style={rowStyle}
            />
          )}
          <CustomInput
            required={true}
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
          <InputFile
            register={register}
            name="image"
            style={{ marginTop: '20px' }}
          />

          <Select
            register={register}
            name="categoryId"
            style={rowStyle}
            validate={(value) => value !== '0'}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          {!watch('isPizza') && (
            <CustomInput
              label="Артикул"
              type="text"
              register={register}
              name="sku"
              style={rowStyle}
            />
          )}

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
                  cursor:
                    amountPizzaSize === 1 || amountPizzaSize > i
                      ? 'not-allowed'
                      : 'pointer',
                  opacity:
                    amountPizzaSize === 1 || amountPizzaSize > i ? '0.5' : '1',
                }}
                onClick={() => {
                  if (amountPizzaSize === 1 || amountPizzaSize > i) return;
                  setAmountPizzaSize((prevState) => prevState - 1);
                  setValue(`size${i as 1 | 2 | 3}`, '');
                  // @ts-ignore
                  setValue(`price${i as 1 | 2 | 3}`, '');
                  setValue(`sku${i as 1 | 2 | 3}`, '');
                }}
              />
            </Stack>
          ))}

          {watch('isPizza') && amountPizzaSize < 3 && (
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

export default ProfileAdminEditProduct;
