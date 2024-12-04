import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsTable from './components/ProductsTable';
import CategoriesTable from './components/CategoriesTable';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-100 shadow">
        <a href="/" className="mr-4 text-blue-600">Home</a>
          <a href="/products" className="mr-4 text-blue-600">Products</a>
          <a href="/categories" className="text-blue-600">Categories</a>
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
