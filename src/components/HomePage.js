import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Welcome to the Management App</h1>
      <div className="space-x-4">
        <Link
          to="/products"
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-blue-600"
        >
          Manage Products
        </Link>
        <Link
          to="/categories"
          className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-orange-600"
        >
          Manage Categories
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
