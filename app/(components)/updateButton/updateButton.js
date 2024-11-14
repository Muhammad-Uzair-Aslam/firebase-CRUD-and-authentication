"use client";
import React, { useState } from "react";
import Modal from "../modal/modal";
import { doc, updateDoc } from "firebase/firestore";
import dataB from "@/app/firebaseConfig";

export default function UpdateButton({ defaultValue }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State to track upload

  const handleOpenModal = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };


    try {
        setIsUploading(true)
      const userDoc = doc(dataB, "newmessage", defaultValue.id); // Reference to the document
      await updateDoc(userDoc, updatedData); // Update document in Firebase
      alert("data updated")
      console.log("Updated Data:", updatedData);
      window.location.reload();
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      setIsUploading(false); // Stop the upload indicator
      handleClose(); // Close the modal
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        defaultValues={defaultValue}
        isUploading={isUploading} // Pass uploading state to modal
      />
      <button
        onClick={handleOpenModal}
        className="text-blue-500 hover:underline"
      >
        Edit
      </button>
    </div>
  );
}
