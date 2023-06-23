import React from "react";
import update from 'immutability-helper'
import DragAndDropItem from "../../../../shared/UI/DragAndDrop";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {getProducts, IProduct, selectProducts} from "../../../../entities/products";
import {enqueueSnackbar} from "notistack";

const ProductsListDnD = () => {
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(selectProducts);
    const [cards, setCards] = React.useState<IProduct[]>([])

    React.useEffect(() => {
        setCards(products)
    }, [products])

    React.useEffect(() => {
        (async function() {
            try {
                await dispatch(getProducts()).unwrap();
            } catch (e) {
                enqueueSnackbar('Ошибка загрузки продуктов', {variant: 'error'});
            }
        })()
    }, [dispatch])

    const moveItem = React.useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: IProduct[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as IProduct],
                ],
            }),
        )
    }, [])

    const renderCard = React.useCallback(
        (card: IProduct, index: number) => {
            return (
                <DragAndDropItem
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.name}
                    moveItem={moveItem}
                />
            )
        },
        [moveItem],
    )

    return (
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
    )

};

export default ProductsListDnD;