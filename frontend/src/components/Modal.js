import React from "react";

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-3/4 lg:w-1/2">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
