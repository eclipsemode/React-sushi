import { IFormInputs } from "../ui/DeliveryForm";
import { OrderType } from "../ui";
interface IOrderProducts {
  id: number,
  name: string,
  price: number,
  rating: number,
  description: string,
  image: string,
  categoryId: number,
  amount: number
  }


interface IOrder extends IFormInputs{
  userId: number | null,
  orderProducts: IOrderProducts[],
  totalPrice: number,
  totalAmount: number,
  type: OrderType
}

export type { IOrderProducts, IOrder };