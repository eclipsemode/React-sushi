import { IFormInputs } from "../ui/DeliveryForm";

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
}

export type { IOrderProducts, IOrder };