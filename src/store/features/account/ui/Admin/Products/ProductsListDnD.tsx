import React from "react";
import update from 'immutability-helper'
import DragAndDropItem from "@shared/UI/DragAndDrop";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import styles from './index.module.scss'
import {
    changeProductsOrder,
    getProducts,
    IProduct,
    IProductOrderChange,
    selectProducts
} from "@store/features/products/api";
import {enqueueSnackbar} from "notistack";
import {Stack} from "@mui/material";
import {setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";

const ProductsListDnD = () => {
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(selectProducts);
    const {categories} = useAppSelector((state) => state.categoriesReducer);
    const [cards, setCards] = React.useState<IProduct[][]>([])

    const parseCards = (cards: IProduct[][]) => {
        const newCards: IProductOrderChange[] = cards.map((card, index) => {
            return {
                id: card.at(0)?.id || 0,
                orderIndex: index + 1
            }
        });
        return newCards;
    }

    React.useEffect(() => {
        setCards(products)
    }, [products])

    React.useEffect(() => {
        (async function () {
            try {
                await dispatch(getProducts()).unwrap();
            } catch (e) {
                enqueueSnackbar('Ошибка загрузки продуктов', {variant: 'error'});
            }
        })()
    }, [dispatch])

    const moveItem = React.useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: IProduct[][]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as IProduct[]],
                ],
            }),
        )
    }, [])

    const renderCard = React.useCallback(
        (card: IProduct[], index: number) => {
            return (
                <div onDrop={() => dispatch(changeProductsOrder(parseCards(cards)))} key={card[0].id}>
                    <DragAndDropItem
                        index={index}
                        id={card[0].id}
                        text={card[0].name}
                        moveItem={moveItem}
                        editEvent={() => {
                            dispatch(setMaterialDialog({
                                opened: true,
                                dialogType: MaterialDialogTypes.PROFILE_ADMIN_EDIT_PRODUCT,
                                data: card
                            }))
                        }}
                        deleteEvent={() => {
                            dispatch(setMaterialDialog({
                                opened: true,
                                dialogType: MaterialDialogTypes.PROFILE_ADMIN_DELETE_PRODUCT,
                                data: card
                            }))
                        }}
                    />
                </div>
            )
        },
        [cards, dispatch, moveItem],
    )

    return (
        categories.map(category => (
            <Stack key={category.id} className={styles.root}>
                <h3 className={styles.title}>{category.name}</h3>
                <div className={styles.card}>{cards.map((card, i) => (category.id === card[0]?.categoryId) && renderCard(card, i))}</div>
            </Stack>
        ))
    )
};

export default ProductsListDnD;