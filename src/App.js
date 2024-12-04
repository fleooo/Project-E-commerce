import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsTable from './components/ProductsTable';
import CategoriesTable from './components/CategoriesTable';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-100 shadow flex space-x-4">
        <a href="/" className="bg-orange-500 text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-orange-600 ">Home</a>
          <a href="/products" className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-blue-600">Products</a>
          <a href="/categories" className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-blue-600">Categories</a>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/categories" element={<CategoriesTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
