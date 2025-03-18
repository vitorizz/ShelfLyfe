import React from "react";

const OrderActivityModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-lg font-bold">{product.name} - Sales Trends</h2>
        {/* Placeholder for graph component */}
        <div className="mt-4">
          {/* Graph component would go here */}
          <p>
            get list of orders for the products and button to show order, in
            orders page
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderActivityModal;
