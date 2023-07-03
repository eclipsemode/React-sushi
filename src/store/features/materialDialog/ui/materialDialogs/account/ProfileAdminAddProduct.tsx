import {useAppDispatch} from "@store/hooks";
import {setMaterialDialog} from "../../../api";
import {enqueueSnackbar} from "notistack";
import {
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    NativeSelect,
    Stack
} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {SubmitHandler, useForm} from "react-hook-form";
import {createProduct, getProducts, ICreateProduct} from "@store/features/products/api";
import Input from "@shared/UI/input";
import React, {CSSProperties} from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface ICreateProductForm extends Omit<ICreateProduct, 'image'> {
    image: FileList,
    price1: number,
    price2: number,
    price3: number,
    sku1: string,
    sku2: string,
    sku3: string,
    size1: string,
    size2: string,
    size3: string
}

const rowStyle: CSSProperties = {
    marginTop: '10px'
}

const ProfileAdminAddProduct = () => {
    const dispatch = useAppDispatch();
    const {register, reset, handleSubmit, watch} = useForm<ICreateProductForm>();
    const [amountPizzaSize, setAmountPizzaSize] = React.useState<number>(1);
    const success = () => {
        dispatch(getProducts());
    };

    const callback = async (data: ICreateProductForm) => {
        try {
            const fileImage: File | null = data.image.item(0);
            if (!!fileImage) {
                if (data.type === 'pizza') {
                    const newPrice: number[] = [];
                    const newSku: string[] = [];
                    const newSize: string[] = [];
                    for (let i = 1; i < amountPizzaSize + 1; i++) {
                        // @ts-ignore
                        newPrice.push(+data[`price${i}`]);
                        // @ts-ignore
                        newSku.push(!!data[`sku${i}`] ? data[`sku${i}`] : null);
                        // @ts-ignore
                        newSize.push(data[`size${i}`]);
                    }

                    await dispatch(createProduct({
                        ...data,
                        price: newPrice,
                        sku: newSku.length > 0 ? newSku : null,
                        size: newSize.length > 0 ? newSize : null,
                        image: fileImage
                    })).unwrap();

                } else {
                    await dispatch(createProduct({
                        ...data,
                        image: fileImage
                    })).unwrap();
                }
            }
            reset();
            enqueueSnackbar('Позиция успешно добавлена!', {variant: 'success'});
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Ошибка добавления товара, попробуйте позднее', {variant: 'error'});
        }
        success();
    }

    const handleAgree: SubmitHandler<ICreateProductForm> = async (data: ICreateProductForm) => {
        await callback(data);
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }));
    }

    const handleDisagree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }))
    }

    const renderSelectType = () => (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Тип
                </InputLabel>
                <NativeSelect
                    defaultValue={'other'}
                    {...register('type')}
                    inputProps={{
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'other'}>Другое</option>
                    <option value={'pizza'}>Пицца</option>
                </NativeSelect>
            </FormControl>
        </Box>
    )

    const getAmountPizzaSizeArr = () => {
        const sizeArr: number[] = [];
        for (let i = 1; i < amountPizzaSize + 1; i++) {
            sizeArr.push(i)
        }

        return sizeArr;
    }

    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                Введите информацию о товаре
            </DialogTitle>
            <form onSubmit={handleSubmit(handleAgree)} onReset={handleDisagree}>
                <DialogContent>
                    {renderSelectType()}
                    <Input required={true} label='Название' type="text" register={register} name='name'
                           style={rowStyle}/>
                    {
                        watch('type') !== 'pizza' &&
                        <Input required={true} label='Цена' type="number" register={register} name='price'
                               style={rowStyle}/>
                    }
                    <Input required={true} label='Рейтинг' type="number" register={register} name='rating'
                           style={rowStyle}/>
                    <Input required={true} label='Описание' type="text" register={register} name='description'
                           style={rowStyle}/>
                    <Stack direction='row' style={rowStyle} sx={{alignItems: 'center', columnGap: '10px'}}>
                        <span style={{color: Colors.$rootText}}>Изображение</span>
                        <input required type="file" {...register('image')} style={{color: Colors.$rootText}}/>
                    </Stack>

                    <Input label='Категория' type="number" register={register} name='categoryId' style={rowStyle}/>
                    {
                        watch('type') !== 'pizza' &&
                        <Input label='Артикул' type="text" register={register} name='sku' style={rowStyle}/>
                    }
                    {watch('type') === 'pizza' && getAmountPizzaSizeArr().map(i => (
                        <Stack key={i} direction='row' sx={{columnGap: '10px', alignItems: 'flex-end'}}
                               style={rowStyle}>
                            <span style={{color: Colors.$rootText, fontSize: '16px'}}>{i}.</span>
                            <Input required={true} label='Размер' type="text" register={register} name={`size${i}`}/>
                            <Input required={true} label='Цена' type="number" register={register} name={`price${i}`}/>
                            <Input label='Артикул' type="text" register={register} name={`sku${i}`}/>
                            <RemoveCircleOutlineIcon color='error' sx={{
                                cursor: amountPizzaSize === 1 ? 'not-allowed' : 'pointer',
                                opacity: amountPizzaSize === 1 ? '0.5' : '1'
                            }} onClick={() => {
                                if (amountPizzaSize === 1) return
                                setAmountPizzaSize(prevState => prevState - 1)
                            }}/>
                        </Stack>
                    ))}

                    {
                        watch('type') === 'pizza' && amountPizzaSize < 3 && (
                            <Stack direction='row' sx={{alignItems: 'center', columnGap: '10px'}} style={rowStyle}>
                                <AddCircleOutlineIcon color='success' sx={{cursor: 'pointer'}} onClick={() => {
                                    if (amountPizzaSize === 3) return;
                                    setAmountPizzaSize(prevState => prevState + 1);
                                }}/>
                                <span style={{color: Colors.$rootText, fontSize: '16px'}}>Добавить размер</span>
                            </Stack>
                        )
                    }
                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <SimpleButton type='reset' color={Colors.$mainColor}
                                  variant='contained'>Отменить</SimpleButton>
                    <SimpleButton type='submit' variant='contained'>Подтвердить</SimpleButton>
                </DialogActions>
            </form>
        </>
    );
};

export default ProfileAdminAddProduct;