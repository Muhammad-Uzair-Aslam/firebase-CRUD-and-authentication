import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, defaultValues, isUploading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-lg overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Update Data</h2>
          <button
            className="text-2xl font-bold hover:scale-110 transform transition"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {/* Modal Body */}
        <div className="text-black p-6">
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={defaultValues?.name || ""}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={defaultValues?.email || ""}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                defaultValue={defaultValues?.message || ""}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Message"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2 rounded-lg transition ${
                  isUploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
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
