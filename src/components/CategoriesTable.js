import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../redux/slices/categoriesSlice';

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const categoriesStatus = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  const [newCategory, setNewCategory] = useState({
    name: '',
  });
  const [editCategory, setEditCategory] = useState(null);

  // Fetch categories when component mounts
  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);

  const handleSave = async () => {
    if (editCategory) {
      dispatch(updateCategory({ id: editCategory.id, updatedCategory: newCategory }));
    } else {
      dispatch(addCategory(newCategory));
    }
    setNewCategory({ name: '' });
    setEditCategory(null);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setNewCategory({ name: category.name });
  };

  const handleDelete = async (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>

      {/* Add / Edit Category Form */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">{editCategory ? 'Edit Category' : 'Add Category'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Category Name"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full">
            {editCategory ? 'Update' : 'Create'}
          </button>
          {editCategory && (
            <button
              type="button"
              onClick={() => {
                setEditCategory(null);
                setNewCategory({ name: '' });
              }}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Categories Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="py-2 px-4 border-b">{category.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-400 text-white py-2 px-3 rounded-full mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white py-2 px-3 rounded-full"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
