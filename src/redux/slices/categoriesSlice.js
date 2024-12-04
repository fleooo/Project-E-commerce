import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action pour récupérer les catégories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://localhost:8000/api/categories/');
  return response.data;
});

// Action pour ajouter une catégorie
export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory) => {
  const response = await axios.post('http://localhost:8000/api/categories/', newCategory);
  return response.data;
});

// Action pour mettre à jour une catégorie
export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, updatedCategory }) => {
  const response = await axios.put(`http://localhost:8000/api/categories/${id}`, updatedCategory);
  return response.data;
});

// Action pour supprimer une catégorie
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  await axios.delete(`http://localhost:8000/api/categories/${id}`);
  return id;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion de fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Gestion de addCategory
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Gestion de updateCategory
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Gestion de deleteCategory
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((category) => category.id !== action.payload);
      });
  },
});

// Export du reducer par défaut
export default categoriesSlice.reducer;



