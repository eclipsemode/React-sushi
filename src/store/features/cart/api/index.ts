import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@store/index';
import {IProduct} from "@store/features/products/api";
import {DeliveryPrice} from "@store/features/order/utils";

export interface ICartProduct extends IProduct {
    amount: number
}

export interface ICartState {
    items: ICartProduct[];
    totalPrice: number;
    deliveryPrice: number;
    totalAmount: number;
    pizzasDiscount: number;
}

const initialState: ICartState = {
    items: [],
    totalPrice: 0,
    deliveryPrice: 0,
    totalAmount: 0,
    pizzasDiscount: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartProduct>) => {
            const foundItem = state.items.find((obj) => obj.sizeId === action.payload.sizeId);

            foundItem
                ? foundItem.amount++
                : state.items.push({
                    ...action.payload,
                    amount: 1,
                });

            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.amount + sum, 0);

            state.totalAmount = state.items.reduce((value, obj) => value + obj.amount, 0);


        },

        removeItem: (state, action: PayloadAction<number>) => {
            const foundItem = state.items.find((obj) => Number(obj.sizeId === action.payload));

            if (!foundItem) return;

            foundItem.amount > 1
                ? foundItem.amount--
                : (state.items = state.items.filter((obj) => obj.sizeId !== action.payload));

            state.totalPrice = state.items.reduce((value, obj) => value + obj.price * obj.amount, 0);
            state.totalAmount = state.items.reduce((value, obj) => value + obj.amount, 0);
        },

        removeAll: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
        },

        removeItemById: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((obj) => Number(obj.sizeId !== action.payload));
            state.totalPrice = state.items.reduce((value, obj) => {
                return value + obj.price;
            }, 0);
            state.totalAmount = state.items.reduce((value, obj) => {
                return value + obj.amount;
            }, 0);
        },
        updateDeliveryPrice: (state) => {
            if (state.totalPrice === 0 || state.totalPrice - state.pizzasDiscount >= DeliveryPrice.MIN) {
                state.deliveryPrice = 0
            } else {
                state.deliveryPrice = 100
            }
        },
        setPizzaPromotion: (state) => {
            let pizzasAmount = 0;
            const pizzasArr = state.items.filter(item => {
                if (item.type === 'pizza') {
                    pizzasAmount += item.amount;
                }
                return item.type === 'pizza';
            }).sort((a, b) => a.price - b.price);

            const discountPizzasAmount = Math.floor(pizzasAmount / 3);

            let currentDiscount = 0;

            if (discountPizzasAmount > 0) {
                let currentIndex = 0;
                let currentAmount = 1;

                for (let i = 0; i < discountPizzasAmount; i++) {
                    if (currentAmount >= pizzasArr[currentIndex].amount) {
                        currentDiscount += pizzasArr[currentIndex].price;
                        currentIndex++;
                        currentAmount = 1;
                    } else {
                        currentDiscount += pizzasArr[currentIndex].price;
                        currentAmount++;
                    }
                }
            }
            state.pizzasDiscount = currentDiscount;
        }
    },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const {
    addItem,
    removeItem,
    removeAll,
    removeItemById,
    updateDeliveryPrice,
    setPizzaPromotion,
} = cartSlice.actions;
export default cartSlice.reducer;
