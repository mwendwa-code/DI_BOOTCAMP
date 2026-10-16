import React, { useCallback } from 'react';
import { configureStore, createSelector, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialProducts = [
  { id: 1, name: 'Canvas Backpack', price: 48.5 },
  { id: 2, name: 'Insulated Water Bottle', price: 22 },
  { id: 3, name: 'Wireless Headphones', price: 79.99 },
  { id: 4, name: 'Desk Organizer', price: 31.25 },
];

const cartSlice = createSlice({
  name: 'shopping',
  initialState: {
    products: initialProducts,
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = state.products.find((item) => item.id === action.payload);
      if (!product) return;

      const cartItem = state.cart.find((item) => item.product.id === product.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cart.push({ product, quantity: 1 });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    shopping: cartSlice.reducer,
  },
});

export const selectProducts = (state) => state.shopping.products;
export const selectCartItems = (state) => state.shopping.cart;

export const calculateTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
);

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const buttonStyle = {
  border: '1px solid #293c5a',
  borderRadius: '6px',
  padding: '8px 12px',
  color: '#fff',
  background: '#293c5a',
  cursor: 'pointer',
  font: 'inherit',
};

export function ShoppingCart() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(calculateTotalPrice);

  const handleAddToCart = useCallback((productId) => {
    dispatch(addToCart(productId));
  }, [dispatch]);

  return React.createElement(
    'main',
    {
      style: {
        maxWidth: '900px',
        margin: '40px auto',
        padding: '0 20px',
        color: '#202938',
        fontFamily: 'Arial, sans-serif',
      },
    },
    React.createElement('h1', null, 'Shopping Cart'),
    React.createElement(
      'div',
      { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '36px' } },
      React.createElement(
        'section',
        { 'aria-labelledby': 'products-heading' },
        React.createElement('h2', { id: 'products-heading' }, 'Products'),
        React.createElement(
          'ul',
          { style: { listStyle: 'none', padding: 0, display: 'grid', gap: '12px' } },
          ...products.map((product) =>
            React.createElement(
              'li',
              {
                key: product.id,
                style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', border: '1px solid #e0e4eb', borderRadius: '8px', padding: '14px' },
              },
              React.createElement(
                'div',
                null,
                React.createElement('strong', null, product.name),
                React.createElement('div', { style: { color: '#667085', marginTop: '4px' } }, currency.format(product.price)),
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: () => handleAddToCart(product.id),
                  style: buttonStyle,
                  'aria-label': `Add ${product.name} to cart`,
                },
                'Add to Cart',
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        'section',
        { 'aria-labelledby': 'cart-heading' },
        React.createElement('h2', { id: 'cart-heading' }, `Your Cart (${cartItems.reduce((count, item) => count + item.quantity, 0)})`),
        cartItems.length > 0
          ? React.createElement(
              'ul',
              { style: { listStyle: 'none', padding: 0, display: 'grid', gap: '12px' } },
              ...cartItems.map(({ product, quantity }) =>
                React.createElement(
                  'li',
                  {
                    key: product.id,
                    style: { display: 'flex', justifyContent: 'space-between', gap: '12px', borderBottom: '1px solid #e0e4eb', padding: '10px 0' },
                  },
                  React.createElement('span', null, `${product.name} × ${quantity}`),
                  React.createElement('strong', null, currency.format(product.price * quantity)),
                ),
              ),
            )
          : React.createElement('p', { style: { color: '#667085' } }, 'Your cart is empty.'),
        React.createElement(
          'p',
          { style: { display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #293c5a', paddingTop: '14px' } },
          React.createElement('strong', null, 'Total'),
          React.createElement('strong', { 'aria-live': 'polite' }, currency.format(totalPrice)),
        ),
      ),
    ),
  );
}

export default ShoppingCart;