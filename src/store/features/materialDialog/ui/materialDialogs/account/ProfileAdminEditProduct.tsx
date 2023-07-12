import React, {CSSProperties} from 'react';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {selectMaterialDialog, setMaterialDialog} from "@store/features/materialDialog/api";
import {
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack
} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {SubmitHandler, useForm} from "react-hook-form";
import {changeProduct, getProducts} from "@store/features/products/api";
import {enqueueSnackbar} from "notistack";
import Input from "@shared/UI/input";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {ICreateProductForm} from "@store/features/materialDialog/ui/materialDialogs/account/ProfileAdminAddProduct";
import Select from "@shared/UI/Select";
import InputFile from "@shared/UI/InputFile";

const rowStyle: CSSProperties = {
    marginTop: '10px'
}

const ProfileAdminEditProduct = () => {
    const dispatch = useAppDispatch();
    const {data} = useAppSelector(selectMaterialDialog);
    const {register, reset, handleSubmit, watch} = useForm<ICreateProductForm>({
        defaultValues: {
            name: !!data && data[0].name || '',
            price1: !!data && data.length >= 1 && data[0].price || undefined,
            price2: !!data && data.length > 1 && data[1].price || undefined,
            price3: !!data && data.length > 2 && data[2].price || undefined,
            type: !!data && data[0].type || 'other',
            sku1: !!data && data.length >= 1 && data[0].sku || '',
            sku2: !!data && data.length > 1 && data[1].sku || '',
            sku3: !!data && data.length > 2 && data[2].sku || '',
            size1: !!data && data.length >= 1 && data[0].size || '',
            size2: !!data && data.length > 1 && data[1].size || '',
            size3: !!data && data.length > 2 && data[2].size || '',
            rating: !!data && data[0].rating || undefined,
            description: !!data && data[0].description || '',
            categoryId: !!data && data[0].categoryId || undefined
        }
    });
    const [amountPizzaSize, setAmountPizzaSize] = React.useState<number>(!!data && data.length || 1);
    const success = () => {
        dispatch(getProducts());
    };

    const callback = async (dataForm: ICreateProductForm) => {
        try {
            const fileImage: File | null = dataForm.image.item(0);
            if (dataForm.type === 'pizza') {
                const newPrice: number[] = [];
                const newSku: string[] = [];
                const newSize: string[] = [];
                for (let i = 1; i < amountPizzaSize + 1; i++) {
                    // @ts-ignore
                    newPrice.push(+dataForm[`price${i}`]);
                    // @ts-ignore
                    newSku.push(!!dataForm[`sku${i}`] ? dataForm[`sku${i}`] : null);
                    // @ts-ignore
                    newSize.push(dataForm[`size${i}`]);
                }

                await dispatch(changeProduct({
                    ...dataForm,
                    id: !!data && data[0].id || 0,
                    price: newPrice,
                    sku: newSku.length > 0 ? newSku : null,
                    size: newSize.length > 0 ? newSize : null,
                    image: fileImage
                })).unwrap();

            } else {
                await dispatch(changeProduct({
                    ...dataForm,
                    id: !!data && data[0].id || 0,
                    price: [dataForm.price1],
                    image: fileImage
                })).unwrap();
            }

            reset();
            enqueueSnackbar('Позиция успешно изменена!', {variant: 'success'});
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Ошибка изменения товара, попробуйте позднее', {variant: 'error'});
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
            <Select register={register} name='type'>
                <option value={'other'}>Другое</option>
                <option value={'pizza'}>Пицца</option>
            </Select>
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
                        <Input required={true} label='Цена' type="number" register={register} name='price1'
                               style={rowStyle}/>
                    }
                    <Input required={true} label='Рейтинг' type="number" register={register} name='rating'
                           style={rowStyle}/>
                    <Input required={true} label='Описание' type="text" register={register} name='description'
                           style={rowStyle}/>
                    <InputFile register={register} name='image' style={{marginTop: '20px'}}/>

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

export default ProfileAdminEditProduct;