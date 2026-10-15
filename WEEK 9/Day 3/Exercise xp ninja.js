import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct(state, action) {
      const { name, quantity } = action.payload;
      const trimmedName = typeof name === 'string' ? name.trim() : '';

      if (!trimmedName || !Number.isInteger(quantity) || quantity < 0) return;

      state.products.push({
        id: nanoid(),
        name: trimmedName,
        quantity,
      });
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = state.products.find((item) => item.id === id);

      if (!product || !Number.isInteger(quantity) || quantity < 0) return;

      product.quantity = quantity;
    },
    removeProduct(state, action) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions;
export default inventorySlice.reducer;