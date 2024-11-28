"use client"
import Link from "next/link";
import { useSignupValidation } from "../validationSchema/auth";
export default function Signup() {
    const {register,handleSubmit,formState:{errors}}=useSignupValidation()
    const submitHandler = (values) => {
        console.log("Form values:", values);
      };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-sm text-center text-gray-500">
          Sign up to explore new features
        </p>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name')}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"            
            />
            {errors.name&&<p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
            {errors.email&&<p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"    
            />
            {errors.password&&<p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              {...register('confirm_password')}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              
            />
          </div>
          {errors.confirm_password&&<p className="text-sm text-red-500">{errors.confirm_password.message}</p>}
          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login">
            <span className="font-medium text-teal-500 hover:underline">
              Login here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
