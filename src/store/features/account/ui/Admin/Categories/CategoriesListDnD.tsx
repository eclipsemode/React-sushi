import React from 'react';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import update from "immutability-helper";
import DragAndDropItem from "@shared/UI/DragAndDrop";
import styles from "@store/features/account/ui/Admin/Products/index.module.scss";
import {ICategories} from "@store/features/categories";
import {setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";

const CategoriesListDnD = () => {
    const dispatch = useAppDispatch();
    const {categories} = useAppSelector((state) => state.categoriesReducer);
    const [cards, setCards] = React.useState<ICategories[]>([])

    const handleDeleteCategory = (id: number) => {
        dispatch(setMaterialDialog({
            opened: true,
            dialogType: MaterialDialogTypes.PROFILE_ADMIN_DELETE_CATEGORY,
            data: {id}
        }))
    }

    React.useEffect(() => {
        setCards(categories)
    }, [categories])

    const moveItem = React.useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: ICategories[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as ICategories],
                ],
            }),
        )
    }, [])

    const renderCard = React.useCallback(
        (card: ICategories, index: number) => {
            return (
                <div onDrop={() => console.log(1)} key={card.id}>
                    <DragAndDropItem
                        index={index}
                        id={card.id}
                        text={card.name}
                        moveItem={moveItem}
                        deleteEvent={() => handleDeleteCategory(card.id)}
                        editEvent={() => {
                        }}/>
                </div>
            )
        },
        [cards, moveItem],
    )

    return (
        <div className={styles.card}>{cards.map((card, i) => renderCard(card, i))}</div>
    )
};

export default CategoriesListDnD;