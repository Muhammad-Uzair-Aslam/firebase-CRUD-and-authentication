import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, defaultValues, isUploading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Update Data</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-4">
          <form onSubmit={onSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={defaultValues?.name || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Name"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={defaultValues?.email || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Email"
              />
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                defaultValue={defaultValues?.message || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter Message"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded ${
                  isUploading ? "bg-gray-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
