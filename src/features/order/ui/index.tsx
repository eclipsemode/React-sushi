import React from 'react';
import {CartItem} from 'widgets';
import {removeAll, selectCart} from 'entities/cart';
import styles from './index.module.scss';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {IProducts} from 'entities/products';
import {DeliveryPrice} from 'features/order/utils';
import PickupForm from './PickupForm';
import SimpleButton from 'shared/UI/SimpleButton';
import Alert from 'shared/UI/Alert';
import DeliveryForm from './DeliveryForm';
import {DeviceType, selectAdaptiveServiceSlice} from "../../../processes/services/adaptiveService/adaptiveService";
import DeleteIcon from '@mui/icons-material/Delete';
import Colors from "../../../app/utils/Colors";

export type OrderType = 'delivery' | 'pickup' | null;

const CartOrder: React.FC = () => {
		const {items, totalPrice, deliveryPrice} = useAppSelector(selectCart);
		const {deviceType} = useAppSelector(selectAdaptiveServiceSlice);
		const dispatch = useAppDispatch();
		const [orderType, setOrderType] = React.useState<OrderType>(null);

		const handleRemoveAll = () => {
				if (window.confirm('Подтвердить удаление товаров?')) {
						dispatch(removeAll());
				}
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
								{items.map((obj: IProducts) => (
										<CartItem key={obj.id} obj={obj}/>
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

						{!orderType && (
								<div className={styles.root__type}>
										<div className={styles.root__type_title}>
												<h3>ОФОРМИТЬ ЗАКАЗ</h3>
										</div>
										<div className={styles.root__type_buttons}>
												<SimpleButton type="button" clickEvent={() => setOrderType('delivery')}>
														Доставка
												</SimpleButton>
												<SimpleButton type="button" clickEvent={() => setOrderType('pickup')}>
														Самовывоз
												</SimpleButton>
										</div>
								</div>
						)}

						{orderType === 'pickup' ? (
								<PickupForm clickEvent={() => setOrderType(null)}/>
						) : orderType === 'delivery' ? (
								<DeliveryForm clickEvent={() => setOrderType(null)}/>
						) : null}
				</div>
		);
};

export default CartOrder;
