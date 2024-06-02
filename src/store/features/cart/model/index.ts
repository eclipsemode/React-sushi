import { IProduct, IProductSize } from '@store/features/products/model';

export interface ICartProductSize extends IProductSize {
  amount: number;
}

export interface ICartProduct extends Omit<IProduct, 'productSize'> {
  productSize: ICartProductSize[];
}
