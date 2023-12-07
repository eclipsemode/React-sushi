import React from 'react';
import {useAppDispatch} from '@store/hooks';
import styles from './index.module.scss';
import {setMaterialDialog} from '@store/features/materialDialog/api';
import {MaterialDialogTypes} from '@store/features/materialDialog/model';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import PromoCodeListDnD from '@components/Account/Admin/Promocode/PromoCodeListDnD';
import AdminButton from "@shared/UI/AdminButton";

const AdminPromocode = () => {
    const dispatch = useAppDispatch();

    const onPromoCodeAdd = () => {
        dispatch(
            setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.PROFILE_ADMIN_ADD_PROMOCODE,
            })
        )
    }

    return (
        <div className={styles.wrapper}>
            <AdminButton text='Добавить промокод' clickEvent={onPromoCodeAdd}/>
            <DndProvider backend={HTML5Backend}>
                <PromoCodeListDnD/>
            </DndProvider>
        </div>
    );
};

export default AdminPromocode;
