import {PaymentType} from "@store/features/order/ui/DeliveryForm";
import { OrderType } from "@store/features/order/ui";
import {ICartProduct} from "@store/features/cart/api";
interface IOrderProducts extends Omit<ICartProduct, 'id'>{
  id?: number,
  productId: number,
  orderId?: number
  }


interface IOrder extends IFormData{
  userId?: number | null,
  products: IOrderProducts[],
  totalPrice: number,
  totalAmount: number,
  promocode?: string | null,
  branchId: number
}

type DeliveryTimeType = 1 | 2;

interface IFormData {
  name: string,
  address?: string | null,
  entrance?: number | null,
  floor?: number | null,
  room?: number | null,
  tel: string,
  email: string,
  day: "today" | null,
  time: string | null,
  utensils: number,
  payment: PaymentType,
  commentary: string | null,
  deliveryTime?: DeliveryTimeType,
  agreement_1?: boolean,
  agreement_2?: boolean,
  agreement_3?: boolean,
  type?: OrderType
}

export type { IOrderProducts, IOrder, IFormData };