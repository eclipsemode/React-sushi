import {IFormData, IOrder} from "./IOrder";
import {ICartState} from "@store/features/cart/api";
import { IUserState } from "@store/features/user";
import {ILocationState} from "@store/features/location/api";

class OrderDto {
  public order: IOrder;

  constructor(cart: ICartState, orderIdFrontpad: number, user: IUserState, formData: IFormData, promoCode?: string, locationReducer?: ILocationState) {
    this.order = {
      userId: Number(user.user?.id) ?? null,
      products: cart.items.map((product) => ({
        amount: +product.amount,
        productId: +product.id,
        name: product.name,
        rating: +product.rating,
        description: product.description,
        image: product.image,
        orderIndex: product.orderIndex ? +product.orderIndex : null,
        type: product.type ?? null,
        categoryId: +product.categoryId,
        sizeId: +product.sizeId,
        size: product.size,
        price: +product.price,
        sku: product.sku
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
      promocode: promoCode ?? null,
      branchId: locationReducer?.allBranches.find(branch => branch.name === locationReducer.currentBranch)?.id || 1,
      orderIdFrontpad: orderIdFrontpad
    };
  }
}

export default OrderDto;