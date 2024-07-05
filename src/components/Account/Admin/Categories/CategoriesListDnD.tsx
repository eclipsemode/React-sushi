import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import update from 'immutability-helper';
import DragAndDropItem from '@shared/UI/DragAndDrop';
import styles from './index.module.scss';
import {
  changeCategoryOrder,
  getCategories,
} from '@store/features/categories/api';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { ICategory } from '@store/features/categories/model';
import { enqueueSnackbar } from 'notistack';

const CategoriesListDnD = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const [cards, setCards] = React.useState<ICategory[]>([]);

  const handleDeleteCategory = React.useCallback(
    (id: string) => {
      dispatch(
        setMaterialDialog({
          opened: true,
          dialogType: MaterialDialogTypes.PROFILE_ADMIN_DELETE_CATEGORY,
          data: { id },
        })
      );
    },
    [dispatch]
  );

  const filterCards = (arr: ICategory[]) => {
    return arr.map((item) => {
      return item.id;
    });
  };

  React.useEffect(() => {
    setCards(categories);
  }, [categories]);

  const moveItem = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: ICategory[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as ICategory],
          ],
        })
      );
    },
    []
  );

  const renderCard = React.useCallback(
    (card: ICategory, index: number) => {
      return (
        <div
          onDrop={async () => {
            try {
              await dispatch(changeCategoryOrder(filterCards(cards))).unwrap();
              await dispatch(getCategories());
            } catch (e: any) {
              console.error(e);
              enqueueSnackbar(e.description, {
                variant: 'error',
              });
            }
          }}
          key={card.id}
        >
          <DragAndDropItem
            index={index}
            id={card.id}
            text={card.name}
            moveItem={moveItem}
            deleteEvent={() => handleDeleteCategory(card.id)}
            editEvent={() => {
              dispatch(
                setMaterialDialog({
                  opened: true,
                  dialogType: MaterialDialogTypes.PROFILE_ADMIN_EDIT_CATEGORY,
                  data: card,
                })
              );
            }}
          />
        </div>
      );
    },
    [cards, dispatch, handleDeleteCategory, moveItem]
  );

  return (
    <div className={styles.card}>
      {cards.map((card, i) => renderCard(card, i))}
    </div>
  );
};

export default CategoriesListDnD;
