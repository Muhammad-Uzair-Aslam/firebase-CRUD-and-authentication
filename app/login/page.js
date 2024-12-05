"use client";

import Link from "next/link";
import useLoginValidation from "../validationSchema/auth";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function Login() {
  const [islogin,setIsLogin]=useState(true)
    const router=useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useLoginValidation();
  
  const submitHandler = (values) => {
    // console.log("Form values:", values);
    signInWithEmailAndPassword(auth,values.email,values.password).then((response)=>{
        console.log("response",response)
        router.push('/');
        setIsLogin(true);
        alert("login successfully")
        return response
    }).catch((e)=>{
        console.log("Login Error ", e.message);
        setIsLogin(false)
        alert("Please try Again");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Please login to continue</p>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            {!islogin && <p className="text-sm text-red-500">User not found</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-indigo-500 rounded-lg shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <span className="font-medium text-indigo-500 hover:underline">Sign up here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
