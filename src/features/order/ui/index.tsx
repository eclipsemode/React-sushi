import React from 'react';
import {CartItem} from 'widgets';
import {ICartProduct, selectCart, setOrderType} from 'entities/cart';
import styles from './index.module.scss';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {DeliveryPrice} from 'features/order/utils';
import PickupForm from './PickupForm';
import SimpleButton from 'shared/UI/SimpleButton';
import Alert from 'shared/UI/Alert';
import DeliveryForm from './DeliveryForm';
import {DeviceType, selectAdaptiveServiceSlice} from "../../../processes/services/adaptiveService/adaptiveService";
import DeleteIcon from '@mui/icons-material/Delete';
import Colors from "../../../app/utils/Colors";
import {setMaterialDialog} from "../../materialDialog/api";
import {MaterialDialogTypes} from "../../materialDialog/model";
import Input from "../../../shared/UI/input";
import {Box, CircularProgress, Stack} from "@mui/material";
import {clearPromocodeData, fetchPromocodeCheck, setPromocodeError} from "../api";
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';

export type OrderType = 'delivery' | 'pickup' | null;

const CartOrder: React.FC = () => {
    const {items, totalPrice, deliveryPrice, orderType} = useAppSelector(selectCart);
    const {deviceType} = useAppSelector(selectAdaptiveServiceSlice);
    const {promocode, promocodeError, promocodeCreateLoadProcess} = useAppSelector(state => state.orderCreateReducer);
    const dispatch = useAppDispatch();
    const [promoCodeAccepted, setPromoCodeAccepted] = React.useState<boolean>(false);
    const [promoCodeValue, setPromoCodeValue] = React.useState<string>('');

    React.useEffect(() => {
        if (!!promocode) {
            setPromoCodeAccepted(true);
        } else {
            setPromoCodeAccepted(false);
        }
    }, [promocode])

    const handleRemoveAll = () => {
        dispatch(setMaterialDialog({
            opened: true,
            dialogType: MaterialDialogTypes.CLEAR_CART
        }))
    };

    const renderDesktopTableHeader = () => (
        <tr>
            <th>Товар</th>
            <th>Стоимость</th>
            <th>Количество</th>
            <th>Общая стоимость</th>
        </tr>
    )

    const renderMobileTableHeader = () => (
        <tr>
            <th>Корзина</th>
        </tr>
    )

    return (
        <div className={styles.root}>
            {deliveryPrice !== 0 && orderType !== 'pickup' && (
                <Alert type="error">
                    Внимание! Для бесплатной доставки сумма заказа должны быть не менее {DeliveryPrice.MIN} ₽.
                </Alert>
            )}
            <br/>
            <table className={styles.root__table}>
                <thead>
                {
                    deviceType === DeviceType.DESKTOP ? renderDesktopTableHeader() : renderMobileTableHeader()
                }
                </thead>
                <tbody>
                {items.map((obj: ICartProduct) => (
                    <CartItem key={obj.sizeId} obj={obj}/>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={4}>
                        <div className={styles.root__footer}>
                            {
                                deviceType === DeviceType.DESKTOP ?
                                    <SimpleButton color={Colors.$mainColor} type='reset' variant='contained'
                                                  clickEvent={handleRemoveAll}>Очистить корзину</SimpleButton>
                                    : <DeleteIcon sx={{color: Colors.$rootTextActive, cursor: 'pointer'}}
                                                  onClick={handleRemoveAll}/>
                            }
                            <h4 className={styles.root__footer_price}>Сумма заказа: {totalPrice} ₽</h4>
                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>

            <div className={styles.root__type}>
                <div className={styles.root__type_title}>
                    <h3>ПРОМОКОД</h3>
                </div>
                <div className={styles.root__type_buttons}>
                    <Box sx={{maxWidth: '300px'}}><Input error={promocodeError}
                                                         value={promoCodeValue || ''}
                                                         disabled={promoCodeAccepted}
                                                         endAdornment={promocodeCreateLoadProcess ? <CircularProgress size={20} /> : <Box width={20}></Box>}
                                                         onChangeEvent={(value) => {
                                                             if (!!promocodeError) {
                                                                 dispatch(setPromocodeError(false));
                                                             }
                                                             setPromoCodeValue(value || '');
                                                         }}/></Box>
                    {
                        promoCodeAccepted
                            ? (
                                <SimpleButton type="button" color={Colors.$mainColor}
                                              clickEvent={() => {
                                                  dispatch(clearPromocodeData());
                                                  setPromoCodeAccepted(false);
                                                  setPromoCodeValue('');
                                              }
                                              }>
                                    Отменить
                                </SimpleButton>
                            )
                            : (
                                <SimpleButton type="button" clickEvent={() => {
                                    if (promoCodeValue !== null && promoCodeValue.length > 0) {
                                        dispatch(fetchPromocodeCheck(promoCodeValue));
                                    }
                                }}>
                                    Применить
                                </SimpleButton>
                            )
                    }
                </div>
                {
                    !!promoCodeAccepted && (
                        <Stack sx={{justifyContent: 'center', textAlign: 'center', paddingBottom: '20px', rowGap: '10px'}}>
                            <span style={{fontSize: '22px'}}>ПРОМОКОД АКТИВИРОВАН</span>
                            <span style={{fontSize: '20px'}}>Ваша скидка - {promocode?.discount}{promocode?.type === 'RUB' ? '₽' : '%'}</span>
                            <Divider sx={{borderColor: Colors.$infoColor}} variant="middle" />
                            <Stack direction='row'><InfoIcon sx={{color: Colors.$infoColor}} /><span style={{fontSize: '14px', marginTop: '5px', color: Colors.$infoColor}}>Сумма скидки промокода в рублях не может превышать 50% от стоимости заказа, в противном случае, сумма промокода будет пересчитана для текущего заказа.</span></Stack>
                            <Stack direction='row'><InfoIcon sx={{color: Colors.$infoColor}} /><span style={{fontSize: '14px', marginTop: '5px', color: Colors.$infoColor}}>Сумма скидки промокода рассчитывается только на основную сумму заказа. Стоимость доставки (при наличии) не входит в сумму заказа.</span></Stack>
                        </Stack>
                    )
                }
            </div>

            {!orderType && (
                <div className={styles.root__type}>
                    <div className={styles.root__type_title}>
                        <h3>ОФОРМИТЬ ЗАКАЗ</h3>
                    </div>
                    <div className={styles.root__type_buttons}>
                        <SimpleButton type="button" clickEvent={() => dispatch(setOrderType('delivery'))}>
                            Доставка
                        </SimpleButton>
                        <SimpleButton type="button" clickEvent={() => dispatch(setOrderType('pickup'))}>
                            Самовывоз
                        </SimpleButton>
                    </div>
                </div>
            )}

            {orderType === 'pickup' ? (
                <PickupForm clickEvent={() => dispatch(setOrderType(null))}/>
            ) : orderType === 'delivery' ? (
                <DeliveryForm clickEvent={() => dispatch(setOrderType(null))}/>
            ) : null}
        </div>
    );
};

export default CartOrder;
