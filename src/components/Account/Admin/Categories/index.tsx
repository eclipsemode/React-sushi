import React from 'react';
import styles from './index.module.scss';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { useAppDispatch } from '@store/hooks';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import CategoriesListDnD from '@components/Account/Admin/Categories/CategoriesListDnD';

const AdminCategories = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={styles.add_product}
        onClick={() =>
          dispatch(
            setMaterialDialog({
              opened: true,
              dialogType: MaterialDialogTypes.PROFILE_ADMIN_ADD_CATEGORY,
            })
          )
        }
      >
        Добавить позицию
      </div>

      <DndProvider backend={HTML5Backend}>
        <CategoriesListDnD />
      </DndProvider>
    </>
  );
};

export default AdminCategories;
