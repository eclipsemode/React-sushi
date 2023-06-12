import {PaymentType, TelType} from "../ui/DeliveryForm";
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


interface IOrder extends IFormData{
  userId: number | null,
  orderProducts: IOrderProducts[],
  totalPrice: number,
  totalAmount: number,
  type: OrderType,
  promocode: string
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
  commentary: string,
  deliveryTime?: DeliveryTimeType,
  agreement_1?: boolean,
  agreement_2?: boolean,
  agreement_3?: boolean,
}

export type { IOrderProducts, IOrder, IFormData };