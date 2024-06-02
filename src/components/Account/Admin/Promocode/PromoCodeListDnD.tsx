import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import update from 'immutability-helper';
import DragAndDropItem from '@shared/UI/DragAndDrop';
import styles from './index.module.scss';
import { getAllPromoCodes } from '@store/features/promocode/api';
import { Pagination, Skeleton } from '@mui/material';
import Colors from '@shared/utils/Colors';
import { enqueueSnackbar } from 'notistack';
import CustomInput from '@shared/UI/CustomInput';
import debounce from 'lodash.debounce';
import { IPromocode, PromoCodeListSize } from '@store/features/promocode/model';

const PromoCodeListDnD = () => {
  const dispatch = useAppDispatch();
  const { promocodesList, promocodesCount, promocodeLoadSaveProcess } =
    useAppSelector((state) => state.promocodeReducer);
  const [cards, setCards] = React.useState<IPromocode[]>([]);

  const handleDeletePromoCode = React.useCallback(
    (id: string) => {
      dispatch(
        setMaterialDialog({
          opened: true,
          dialogType: MaterialDialogTypes.PROFILE_ADMIN_DELETE_PROMOCODE,
          data: { id },
        })
      );
    },
    [dispatch]
  );

  React.useEffect(() => {
    (async () => {
      dispatch(getAllPromoCodes({}));
    })();
  }, [dispatch]);

  React.useEffect(() => {
    setCards(promocodesList);
  }, [promocodesList]);

  const changePage = async (page: number) => {
    try {
      await dispatch(getAllPromoCodes({ page })).unwrap();
    } catch (e) {
      enqueueSnackbar('Произошла ошибка, попробуйте позднее', {
        variant: 'error',
      });
    }
  };

  const moveItem = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: IPromocode[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as IPromocode],
          ],
        })
      );
    },
    []
  );

  const renderCard = React.useCallback(
    (card: IPromocode, index: number) => {
      return (
        <div onDrop={async () => {}} key={card.id}>
          <DragAndDropItem
            index={index}
            id={card.id}
            text={card.code}
            moveItem={moveItem}
            deleteEvent={() => handleDeletePromoCode(card.id)}
            editEvent={() => {
              dispatch(
                setMaterialDialog({
                  opened: true,
                  dialogType:
                    MaterialDialogTypes.PROFILE_ADMIN_CHANGE_PROMOCODE,
                  data: card,
                })
              );
            }}
          />
        </div>
      );
    },
    [dispatch, handleDeletePromoCode, moveItem]
  );

  const searchDebounce = React.useCallback(
    debounce(async (value: string) => {
      await dispatch(getAllPromoCodes({ match: value })).unwrap();
    }, 450),
    []
  );

  const handleSearch = async (value: string) => {
    try {
      await searchDebounce(value);
    } catch (e) {
      enqueueSnackbar('Ошибка поиска по названию, попробуйте позднее', {
        variant: 'error',
      });
    }
  };

  const renderSkeleton = () => (
    <div style={{ width: '100%' }}>
      <Skeleton animation="wave" height={522} sx={{ transform: 'none' }} />
    </div>
  );

  return (
    <>
      <CustomInput
        className={styles.search}
        label="Поиск по промокоду"
        onChangeEvent={(value) => handleSearch(value)}
      />
      {promocodeLoadSaveProcess ? (
        renderSkeleton()
      ) : (
        <div className={styles.card}>
          {cards?.map((card, i) => renderCard(card, i))}
        </div>
      )}
      <Pagination
        onChange={(_, page) => changePage(page)}
        count={
          promocodesCount % PromoCodeListSize === 0
            ? promocodesCount / PromoCodeListSize
            : parseInt(String(promocodesCount / PromoCodeListSize + 1))
        }
        sx={{
          justifyContent: 'center',
          display: 'flex',
          marginTop: '10px',
          ' button, .MuiPaginationItem-root': { color: Colors.$rootText },
        }}
      />
    </>
  );
};

export default PromoCodeListDnD;
