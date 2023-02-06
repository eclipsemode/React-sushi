import { IOrder } from "./IOrder";
import { ICartState } from "entities/cart";
import { IUserState } from "entities/user";
import { IProducts } from "entities/products";

class OrderDto {
  public order: IOrder;
  constructor(cart: ICartState, user: IUserState) {
    this.order = {
          userId: user.isAuth ? Number(user.user?.id) : null,
          orderProducts: cart.items.map((e: IProducts) => ({ amount: +e.amount, productId: +e.id, productPrice: +e.price })),
          totalPrice: cart.totalPrice,
          totalAmount: cart.totalAmount
    }
  }
}

export default OrderDto;