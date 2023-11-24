import React from 'react';
import { useAppDispatch } from '@store/hooks';
import styles from './index.module.scss';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PromoCodeListDnD from '@components/Account/Admin/Promocode/PromoCodeListDnD';

const AdminPromocode = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={styles.add_product}
        onClick={() =>
          dispatch(
            setMaterialDialog({
              opened: true,
              dialogType: MaterialDialogTypes.PROFILE_ADMIN_ADD_PROMOCODE,
            })
          )
        }
      >
        Добавить промокод
      </div>

      <DndProvider backend={HTML5Backend}>
        <PromoCodeListDnD />
      </DndProvider>
    </>
  );
};

export default AdminPromocode;
