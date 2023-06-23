import {useAppDispatch} from "app/hooks";
import {setMaterialDialog} from "../../../api";
import {enqueueSnackbar} from "notistack";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import SimpleButton from "shared/UI/SimpleButton";
import Colors from "app/utils/Colors";
import {SubmitHandler, useForm} from "react-hook-form";
import {createProduct, getProducts, ICreateProduct} from "entities/products";
import Input from "../../../../../shared/UI/input";

interface ICreateProductForm extends Omit<ICreateProduct, 'image'> {
    image: FileList
}

const ProfileAdminAddProduct = () => {
    const dispatch = useAppDispatch();
    const {register, reset, handleSubmit} = useForm<ICreateProductForm>();
    const success = () => {
        dispatch(getProducts());
    };

    const callback = async (data: ICreateProductForm) => {
        try {
            const fileImage: File | null = data.image.item(0);
            if (!!fileImage) {
                await dispatch(createProduct({
                    ...data,
                    image: fileImage
                })).unwrap();
            }
            reset();
            enqueueSnackbar('Позиция успешно добавлена!', { variant: 'success' });
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Ошибка добавления товара, попробуйте позднее', { variant: 'error' });
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
    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                Введите информацию о товаре
            </DialogTitle>
            <form action="" onSubmit={handleSubmit(handleAgree)} onReset={handleDisagree}>
            <DialogContent style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
                        <Input required={true} label='Название' type="text" register={register} name='name'/>
                        <Input required={true} label='Цена' type="text" register={register} name='price'/>
                        <Input required={true} label='Рейтинг' type="text" register={register} name='rating'/>
                        <Input required={true} label='Описание' type="text" register={register} name='description'/>
                        <span style={{color: Colors.$rootText}}>Изображение</span>
                        <input required type="file" {...register('image')} style={{color: Colors.$rootText}}/>
                        <Input required={true} label='Категория' type="text" register={register} name='categoryId'/>
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