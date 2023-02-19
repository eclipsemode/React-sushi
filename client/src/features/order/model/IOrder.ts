import { IFormInputs } from "../ui/DeliveryForm";
import { OrderType } from "../ui";
interface IOrderProducts {
    amount: number,
    productId: number,
    productPrice: number
  }


interface IOrder extends IFormInputs{
  userId: number | null,
  orderProducts: IOrderProducts[],
  totalPrice: number,
  totalAmount: number,
  type: OrderType
}

export type { IOrderProducts, IOrder };