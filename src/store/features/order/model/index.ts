export type TOrderType = 'DELIVERY' | 'PICKUP';

export type TOrderPayment = 'CASH' | 'CARD';

export enum OrderStatus {
  new = 'new',
  accepted = 'accepted',
  production = 'production',
  produced = 'produced',
  delivery = 'delivery',
  completed = 'completed',
  deleted = 'deleted',
}

export interface IOrderProduct {
  readonly id: string;
  isPizza: boolean;
  name: string;
  rating: number;
  description: string;
  image?: string;
  categoryId?: string;
  createdAt?: Date;
  price: number;
  sku?: string;
  amount: number;
  productSize: string;
  orderId: string;
  productId?: string;
}

export interface IOrder {
  readonly id: string;
  totalPrice: number;
  totalAmount: number;
  type: TOrderType;
  clientName: string;
  clientAddress?: string;
  clientEntrance?: string;
  clientFloor?: string;
  clientRoom?: string;
  clientTel: string;
  clientEmail?: string;
  preOrderDate?: Date;
  utensils: string;
  payment: TOrderPayment;
  commentary?: string;
  promoCodeId?: string;
  orderProducts?: IOrderProduct[];
  status: OrderStatus;
  channel?: number;
  userId?: string;
  branchId?: string;
  readonly createdAt?: Date;
}

export interface IGetAllOrdersByUserId {
  orders: IOrder[];
  _count: number;
}

type DeliveryTimeType = 1 | 2;

export interface IFormData
  extends Omit<
    IOrder,
    | 'createdAt'
    | 'channel'
    | 'branchId'
    | 'userId'
    | 'status'
    | 'promoCodeId'
    | 'totalAmount'
    | 'totalPrice'
    | 'id'
  > {
  day: 'today' | null;
  time: string | null;
  deliveryTime?: DeliveryTimeType;
  agreement_1?: boolean;
  agreement_2?: boolean;
  agreement_3?: boolean;
}
