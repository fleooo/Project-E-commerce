import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../redux/slices/productsSlice";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import axios from "axios";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const categories = useSelector((state) => state.categories.items);
  const error = useSelector((state) => state.products.error);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
  });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fonction pour obtenir le nom de la catégorie via l'ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  const handleSave = () => {
    if (editProduct) {
      dispatch(updateProduct({ id: editProduct.id, updatedProduct: newProduct }));
    } else {
      dispatch(addProduct(newProduct));
    }
    setNewProduct({ name: "", price: "", description: "", category_id: "" });
    setEditProduct(null);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      category_id: product.category?.id || "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Product Management</h1>

      {/* Add / Edit Product Form */}
      <div className="bg-gray-100 p-4 mb-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">{editProduct ? "Edit Product" : "Add Product"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-wrap gap-4"
        >
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Product Name"
            className="border p-2 rounded w-full md:w-1/4"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Price"
            className="border p-2 rounded w-full md:w-1/4"
            required
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Description"
            className="border p-2 rounded w-full md:w-1/2"
            required
          />
          <select
            name="category_id"
            value={newProduct.category_id}
            onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
            className="border p-2 rounded w-full md:w-1/4"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded shadow">
            {editProduct ? "Update" : "Create"}
          </button>
        </form>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Products Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.description}</td>
              <td className="py-2 px-4">{getCategoryName(product.category?.id)}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
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

export default ProductsTable;

