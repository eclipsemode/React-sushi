import { ICartState } from '@store/features/cart/api';
import { IUserState } from '@store/features/user/api';
import { IBranchState } from '@store/features/branch/api';
import {
  IFormData,
  IOrder,
  IOrderProduct,
  OrderStatus,
} from '@store/features/order/model/index';
import { ICartProduct } from '@store/features/cart/model';

interface IOrderProductDto
  extends Pick<IOrderProduct, 'sku' | 'productSize' | 'productId'> {
  price: string;
  amount: string;
}

interface IOrderDto
  extends Pick<IOrder, 'type' | 'clientName' | 'payment' | 'status'> {
  id: string | null;
  userId: string | null;
  totalPrice: string;
  totalAmount: string;
  clientAddress: string | null;
  clientEntrance: string | null;
  clientFloor: string | null;
  clientRoom: string | null;
  clientTel: string;
  clientEmail: string | null;
  preOrderDate: Date | null;
  commentary: string | null;
  promoCodeId: string | null;
  channel: number | null;
  branchId: string;
  utensils: string;
  orderProducts: IOrderProductDto[];
}

export default class OrderDto {
  public order: IOrderDto;

  constructor(
    cart: ICartState,
    orderIdFrontpad: string | null,
    user: IUserState,
    formData: IFormData,
    promoCodeId?: string,
    branchReducer?: IBranchState
  ) {
    this.order = {
      status: OrderStatus.new,
      userId: user.user?.id || null,
      orderProducts: this.parseProducts(cart.products),
      id: orderIdFrontpad || null,
      totalPrice: String(cart.totalPrice),
      totalAmount: String(cart.totalAmount),
      type: formData.type,
      clientName: formData.clientName,
      clientAddress: formData.clientAddress ?? null,
      clientEntrance: formData.clientEntrance ?? null,
      clientFloor: formData.clientFloor ?? null,
      clientRoom: formData.clientRoom ?? null,
      clientTel: formData.clientTel.replace(/\D/g, ''),
      clientEmail: formData.clientEmail ? formData.clientTel : null,
      preOrderDate: formData.time
        ? this.convertDate(formData.time, 'today')
        : null,
      utensils: String(formData.utensils),
      payment: formData.payment,
      commentary: formData.commentary ?? null,
      promoCodeId: promoCodeId ?? null,
      branchId: branchReducer?.currentBranch?.id || '',
      channel: 2030,
    };
  }

  private parseProducts = (products: ICartProduct[]) => {
    const arr: IOrderProductDto[] = [];

    for (const product of products) {
      for (const productSize of product.productSize) {
        arr.push({
          price: String(productSize.price),
          sku: productSize.sku,
          amount: String(productSize.amount),
          productSize: productSize.name,
          productId: productSize.productId,
        });
      }
    }

    return arr;
  };

  private convertDate = (time: string, day: 'today' | 'tomorrow') => {
    const [hours, minutes] = time.split(':');
    const date = new Date();

    if (day === 'tomorrow') {
      date.setDate(date.getDate() + 1);
    }

    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      +hours,
      +minutes
    );

    return dateTime;
  };
}
