import { IOrder } from "./IOrder";
import { ICartState } from "entities/cart";
import { IUserState } from "entities/user";
import { IProducts } from "entities/products";
import { IFormInputs } from "features/order/ui/DeliveryForm";

class OrderDto {
  public order: IOrder;

  constructor(cart: ICartState, user: IUserState, formData: IFormInputs) {
    this.order = {
      userId: user.isAuth ? Number(user.user?.id) : null,
      orderProducts: cart.items.map((e: IProducts) => ({
        amount: +e.amount,
        productId: +e.id,
        productPrice: +e.price
      })),
      totalPrice: cart.totalPrice + cart.deliveryPrice,
      totalAmount: cart.totalAmount,
      name: formData.name,
      address: formData.address,
      entrance: formData.entrance,
      floor: formData.floor,
      room: formData.room,
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