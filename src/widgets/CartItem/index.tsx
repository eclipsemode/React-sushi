import React from 'react';
import {addItem, removeItem, removeItemById, selectCart} from "entities/cart";
import {IProducts} from 'entities/products';
import styles from './index.module.scss';
import {useAppDispatch, useAppSelector} from "app/hooks";
import {CloseOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {DeviceType, selectAdaptiveServiceSlice} from "../../processes/services/adaptiveService/adaptiveService";
import {Stack} from "@mui/material";
import {setMaterialDialog} from "../../features/materialDialog/api";
import {MaterialDialogTypes} from "../../features/materialDialog/model";

export type CartItemProps = {
    obj: IProducts;
};

const CartItem: React.FC<CartItemProps> = ({obj}) => {
    const {deviceType} = useAppSelector(selectAdaptiveServiceSlice);
    const {items, totalAmount} = useAppSelector(selectCart);
    const dispatch = useAppDispatch();

    const handleAddItem = () => {
        dispatch(addItem(obj))
    }

    const handleRemoveItem = () => {
        if (items.length === 1 && totalAmount === 1) {
            dispatch(setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.CLEAR_CART
            }))
        } else {
            dispatch(removeItem(obj.id));
        }
    }

    const handleRemoveItemById = () => {
        if (items.length === 1) {
            dispatch(setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.CLEAR_CART
            }))
        } else {
            dispatch(removeItemById(obj.id));
        }
    };

    const renderDesktopMenuItem = () => (
        <tr className={styles.root}>
            <td className={styles.root__product}>
                <CloseOutlined onClick={handleRemoveItemById}/>
                <img width={200}
                     src={process.env.REACT_APP_API_URL + obj.image} alt="productImg"/>
                <h5>{obj.name}</h5>
            </td>
            <td className={styles.root__price}>{obj.price} ₽</td>
            <td className={styles.root__amount}>
                <div>
                    <MinusCircleOutlined style={{fontSize: '24px'}} className={styles.root__minus}
                                         onClick={() => handleRemoveItem()}/>
                    <span>{obj.amount}</span>
                    <PlusCircleOutlined style={{fontSize: '24px'}} className={styles.root__plus}
                                        onClick={() => handleAddItem()}/>
                </div>
            </td>
            <td className={styles.root__total}>{obj.price * obj.amount} ₽</td>
        </tr>
    )

    const renderMobileMenuItem = () => (
        <tr className={styles.mobile__root}>
            <td className={styles.mobile__product}>
                <img width={100} src={process.env.REACT_APP_API_URL + obj.image} alt="productImg"/>
                <Stack justifyContent='space-between'>
                    <Stack>
                        <h5>{obj.name}</h5>
                        <span className={styles.mobile__price}>Цена за 1 шт. - {obj.price} ₽</span>
                    </Stack>
                    <span className={styles.mobile__priceTotal}>Цена - {obj.price * obj.amount} ₽</span>
                </Stack>
            </td>
            <td className={styles.mobile__amount}>
                <div>
                    <MinusCircleOutlined style={{fontSize: '24px'}} className={styles.root__minus}
                                         onClick={() => handleRemoveItem()}/>
                    <span className={styles.mobile__amountNumber}>{obj.amount}</span>
                    <PlusCircleOutlined style={{fontSize: '24px'}} className={styles.root__plus}
                                        onClick={() => handleAddItem()}/>
                </div>
            </td>
        </tr>
    )
    return deviceType === DeviceType.DESKTOP ? renderDesktopMenuItem() : renderMobileMenuItem()
};

export default CartItem;
