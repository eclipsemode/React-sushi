import {PaymentType, TelType} from "../ui/DeliveryForm";
import { OrderType } from "../ui";
import {ICartProduct} from "../../../entities/cart";
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
  promocode?: string | null
}

type DeliveryTimeType = 1 | 2;

interface IFormData {
  name: string,
  address?: string | null,
  entrance?: number | null,
  floor?: number | null,
  room?: number | null,
  tel: TelType,
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