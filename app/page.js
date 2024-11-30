"use client";
import { Suspense } from "react";
import Data from "./(components)/data/data";
import Form from "./(components)/form/form";
import { useRouter } from "next/navigation";
import { logout } from "./firebaseConfig";
import withAuth from "@/utils/withAuth";

function Home({ user }) {
  const router = useRouter();
  const handleLogout = () => {
    logout(router);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">
            Welcome, {user.email.split("@")[0]}!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            You are logged in as <span className="font-medium">{user.email}</span>.
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 transition duration-150"
          >
            Logout
          </button>
        </div>

        {/* Form Section */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Submit Your Data
          </h2>
          <Form />
        </div>
        </div>
        {/* Data Section */}
          <Suspense
            fallback={
              <div className="text-center text-gray-500">
                Loading data...
              </div>
            }
          >
            <Data />
          </Suspense>      
    </div>
  );
}

export default withAuth(Home);
