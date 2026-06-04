import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemCount(state, action) {
      const selectedItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      selectedItem.quantity++;
      selectedItem.totalPrice = selectedItem.quantity * selectedItem.unitPrice;
    },
    decreaseItemCount(state, action) {
      const selectedItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      if (selectedItem.quantity <= 1) {
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
      } else {
        selectedItem.quantity--;
        selectedItem.totalPrice =
          selectedItem.quantity * selectedItem.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addItem,
  deleteItem,
  increaseItemCount,
  decreaseItemCount,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;
export const getTotalPizzas = (state) =>
  state.cart.cart.reduce((agg, val) => {
    return agg + val.quantity;
  }, 0);
export const getTotalCost = (state) =>
  state.cart.cart.reduce((agg, val) => {
    return agg + val.totalPrice;
  }, 0);
