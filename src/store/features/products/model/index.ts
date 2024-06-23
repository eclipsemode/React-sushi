export enum ProductsStatus {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export interface ICreateProduct
  extends Pick<
    IProduct,
    'isPizza' | 'name' | 'description' | 'categoryId' | 'rating'
  > {
  image?: File;
  productSizes: string[];
  productPrices: number[];
  productSkus: string[];
}

export interface IProductSize {
  readonly id?: string;
  productId: string;
  name: string;
  price: number;
  sku?: string;
  createdAt?: Date;
}

export interface IProduct {
  readonly id?: string;
  isPizza: boolean;
  productSize: IProductSize[];
  name: string;
  rating?: number;
  description: string;
  image?: string;
  orderIndex?: number;
  categoryId: string;
  createdAt?: Date;
}

export interface IProductOrderChange {
  id: string;
  orderIndex: number;
}
