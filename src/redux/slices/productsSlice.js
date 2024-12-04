import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone pour récupérer les produits
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:8000/api/products/');
  return response.data;
});

// Action asynchrone pour ajouter un produit
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const response = await axios.post('http://localhost:8000/api/products/', newProduct);
  return response.data;
});

// Action asynchrone pour mettre à jour un produit
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, updatedProduct }) => {
  const response = await axios.put(`http://localhost:8000/api/products/${id}`, updatedProduct);
  return response.data;
});

// Action asynchrone pour supprimer un produit
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`http://localhost:8000/api/products/${id}`);
  return id; // Retourne l'ID du produit supprimé
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
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("Fetched products:", action.payload);
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // Ajoute le nouveau produit
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // Met à jour le produit
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.id !== action.payload); // Supprime le produit
      });
  },
});

export default productsSlice.reducer;


