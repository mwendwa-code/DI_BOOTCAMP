import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}.`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('The products response was not a list.');
    }

    return data.map((product) => {
      if (
        !Number.isInteger(product.id) ||
        typeof product.title !== 'string' ||
        typeof product.price !== 'number' ||
        typeof product.image !== 'string'
      ) {
        throw new Error('The products response contains invalid product data.');
      }

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: typeof product.description === 'string' ? product.description : '',
        category: typeof product.category === 'string' ? product.category : 'General',
        image: product.image,
        rating: typeof product.rating?.rate === 'number' ? product.rating.rate : null,
      };
    });
  },
  {
    condition: (_, { getState }) => getState().products.status !== 'loading',
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unable to fetch products.';
      });
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    decreaseQuantity(state, action) {
      const existingItem = state.items.find((item) => item.product.id === action.payload);
      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.product.id !== action.payload);
      } else {
        existingItem.quantity -= 1;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { addItem, decreaseQuantity, removeItem, clearCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});