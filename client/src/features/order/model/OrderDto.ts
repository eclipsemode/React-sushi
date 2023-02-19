import { IOrder } from "./IOrder";
import { ICartState } from "entities/cart";
import { IUserState } from "entities/user";
import { IProducts } from "entities/products";

class OrderDto {
  public order: Partial<IOrder>;

  constructor(cart: ICartState, user: IUserState, formData: Partial<IOrder>) {
    this.order = {
      userId: user.isAuth ? Number(user.user?.id) : null,
      orderProducts: cart.items.map((e: IProducts) => ({
        amount: +e.amount,
        productId: +e.id,
        productPrice: +e.price
      })),
      totalPrice: cart.totalPrice + cart.deliveryPrice,
      totalAmount: cart.totalAmount,
      type: formData.type,
      name: formData.name,
      address: formData.address,
      entrance: Number(formData.entrance),
      floor: Number(formData.floor),
      room: Number(formData.room),
      tel: formData.tel,
      email: formData.email,
      day: formData.day,
      time: formData.time,
      utensils: formData.utensils,
      payment: formData.payment,
      commentary: formData.commentary
    };
  }
}

export default OrderDto;