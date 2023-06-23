import styles from './index.module.scss'
import {useAppDispatch} from "../../../app/hooks";
import {Stack} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {createProduct, ICreateProduct} from "../../../entities/products";

interface ICreateProductForm extends Omit<ICreateProduct, 'image'>{
    image: FileList
}

const Admin = () => {
    const dispatch = useAppDispatch();
    const { register, reset, handleSubmit } = useForm<ICreateProductForm>();

    const onSubmit: SubmitHandler<ICreateProductForm> = (data) => {
        const fileImage: File | null = data.image.item(0);
        if (!!fileImage) {
            dispatch(createProduct({
                ...data,
                image: fileImage
            }));
        }
        reset();
    }


    return (
        <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <span>Название</span>
                <input required type="text" {...register('name')}/>
            </Stack>
            <Stack>
                <span>Цена</span>
                <input required type="text" {...register('price')}/>
            </Stack>
            <Stack>
                <span>Рейтинг</span>
                <input required type="number" {...register('rating')}/>
            </Stack>
            <Stack>
                <span>Описание</span>
                <input required type="text" {...register('description')}/>
            </Stack>
            <Stack>
                <span>Изображение</span>
                <input required type="file" {...register('image')}/>
            </Stack>
            <Stack>
                <span>Категория</span>
                <input required={true} type="number" {...register('categoryId')}/>
            </Stack>
            <input type="reset"/>
            <input type="submit"/>
        </form>
    );
};

export default Admin;