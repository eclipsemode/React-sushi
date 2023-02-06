interface IOrderProducts {
    amount: number,
    productId: number,
    productPrice: number
  }


interface IOrder {
  userId: number | null,
  orderProducts: IOrderProducts[],
  totalPrice: number,
  totalAmount: number
}

export type { IOrderProducts, IOrder };