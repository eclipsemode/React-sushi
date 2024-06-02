import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import { DeliveryPrice } from '@store/features/order/utils';
import { ICartProduct, ICartProductSize } from '@store/features/cart/model';

export interface ICartState {
  products: ICartProduct[];
  totalPrice: number;
  deliveryPrice: number;
  totalAmount: number;
  pizzasDiscount: number;
}

const initialState: ICartState = {
  products: [],
  totalPrice: 0,
  deliveryPrice: 0,
  totalAmount: 0,
  pizzasDiscount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculatePriceAndAmount: (state) => {
      state.totalPrice = state.products.reduce((sum, obj) => {
        let price = obj.productSize.reduce(
          (xSum, xObj) => +xObj.price * (xObj.amount || 0) + xSum,
          0
        );
        return sum + price;
      }, 0);

      state.totalAmount = state.products.reduce((amount, obj) => {
        let currentAmount = obj.productSize.reduce(
          (xAmount, xObj) => (xObj.amount || 0) + xAmount,
          0
        );
        return amount + currentAmount;
      }, 0);
    },

    addItem: (state, action: PayloadAction<ICartProduct>) => {
      const newProduct = action.payload;
      const foundProductIndexInCart = state.products?.findIndex(
        (product) => product.id === newProduct.id
      );

      if (foundProductIndexInCart >= 0) {
        const foundProductSizeIndexInProduct = state.products[
          foundProductIndexInCart
        ].productSize.findIndex(
          (size) => size.id === newProduct.productSize[0].id
        );

        if (foundProductSizeIndexInProduct >= 0) {
          const currentProductSize =
            state.products[foundProductIndexInCart].productSize[
              foundProductSizeIndexInProduct
            ];
          currentProductSize.amount = (currentProductSize.amount || 0) + 1;
        } else {
          state.products[foundProductIndexInCart].productSize = [
            ...state.products[foundProductIndexInCart].productSize,
            { ...newProduct.productSize[0], amount: 1 },
          ];
        }
      } else {
        state.products = [
          ...(state.products || []),
          {
            ...newProduct,
            productSize: [{ ...newProduct.productSize[0], amount: 1 }],
          },
        ];
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const currentSizeId = action.payload;

      let foundProductSize: ICartProductSize | undefined;
      const foundProduct = state.products.find((x) => {
        foundProductSize = x.productSize.find((a) => a.id === currentSizeId);

        return foundProductSize;
      });

      if (foundProduct && foundProductSize && foundProductSize.amount) {
        if (foundProductSize.amount > 1) {
          foundProductSize.amount = foundProductSize.amount - 1;
        } else {
          if (foundProduct.productSize.length > 1) {
            foundProduct.productSize = foundProduct.productSize.filter(
              (x) => x.id !== foundProductSize?.id
            );
          } else {
            state.products = state.products.filter(
              (x) => x.id !== foundProduct.id
            );
          }
        }
      }
    },

    removeAll: (state) => {
      state.products = [];
    },

    removeItemBySizeId: (state, action: PayloadAction<string>) => {
      let foundProductSize: ICartProductSize | undefined;
      const foundProduct = state.products.find((x) => {
        foundProductSize = x.productSize.find((a) => a.id === action.payload);

        return foundProductSize;
      });

      if (foundProduct) {
        if (foundProduct.productSize.length > 1) {
          foundProduct.productSize = foundProduct.productSize.filter(
            (x) => x.id !== foundProductSize?.id
          );
        } else {
          state.products = state.products.filter(
            (x) => x.id !== foundProduct.id
          );
        }
      }
    },

    updateDeliveryPrice: (state) => {
      if (
        state.totalPrice === 0 ||
        state.totalPrice - state.pizzasDiscount >= DeliveryPrice.MIN
      ) {
        state.deliveryPrice = 0;
      } else {
        state.deliveryPrice = 100;
      }
    },

    setPizzaPromotion: (state) => {
      const pizzaPriceArr: number[] = [];

      state.products.forEach((product) => {
        if (product.isPizza) {
          product.productSize.forEach((x) => {
            for (let i = 0; i < (x.amount || 0); i++) {
              pizzaPriceArr.push(+x.price);
            }
          });
        }
      });

      pizzaPriceArr.sort((a, b) => a - b);

      const freePizzaAmount = Math.floor(pizzaPriceArr.length / 3);
      const freePizzasArr = pizzaPriceArr.slice(0, freePizzaAmount);
      const discountPrice = freePizzasArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );

      state.pizzasDiscount = discountPrice;
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const {
  addItem,
  removeItem,
  removeAll,
  removeItemBySizeId,
  updateDeliveryPrice,
  setPizzaPromotion,
  calculatePriceAndAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
