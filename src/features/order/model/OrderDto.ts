import { IOrder } from "./IOrder";
import {ICartProduct, ICartState} from "entities/cart";
import { IUserState } from "entities/user";
import {IOrderCreate} from "../api";

class OrderDto {
  public order: Partial<IOrder>;

  constructor(cart: ICartState, user: IUserState, formData: Partial<IOrder>, orderCreateReducer: IOrderCreate) {
    this.order = {
      userId: user.isAuth ? Number(user.user?.id) : null,
      orderProducts: cart.items.map((e: ICartProduct) => ({
        amount: +e.amount,
        id: +e.id,
        price: +e.price,
        name: e.name,
        rating: +e.rating,
        description: e.description,
        image: e.image,
        categoryId: +e.categoryId
      })),
      totalPrice: cart.finalPrice,
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
      commentary: formData.commentary,
      promocode: orderCreateReducer.promocode?.code ?? null
    };
  }
}

export default OrderDto;