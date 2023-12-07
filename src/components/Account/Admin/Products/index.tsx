import React from 'react';
import styles from './index.module.scss';
import {setMaterialDialog} from '@store/features/materialDialog/api';
import {MaterialDialogTypes} from '@store/features/materialDialog/model';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import ProductsListDnD from '@components/Account/Admin/Products/ProductsListDnD';
import {useAppDispatch} from '@store/hooks';
import AdminButton from "@shared/UI/AdminButton";

const AdminProducts = () => {
    const dispatch = useAppDispatch();

    const onProductAdd = () => {
        dispatch(
            setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.PROFILE_ADMIN_ADD_PRODUCT,
            })
        )
    }

    return (
        <div className={styles.wrapper}>
            <AdminButton text='Добавить позицию' clickEvent={onProductAdd}/>
            <DndProvider backend={HTML5Backend}>
                <ProductsListDnD/>
            </DndProvider>
        </div>
    );
};

export default AdminProducts;
