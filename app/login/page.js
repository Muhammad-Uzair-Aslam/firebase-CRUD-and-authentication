"use client";

import Link from "next/link";
import useLoginValidation from "../validationSchema/auth";
import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
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
  useEffect(() => {
    if (!islogin) {
      // Redirect to the main page after login
      router.push("/"); // Replace "/main" with your main page route
    }
  }, [islogin,router]);
  
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
  const handleFacebookSignIn=async()=>{
     const provider= new FacebookAuthProvider()
     try {
      const result=await signInWithRedirect(auth, provider)
      alert(`SignIn as ${result.user.displayName}`)
     } catch (error) {
      alert("error")
     }
  }
  const handleGithubSignIn=async()=>{

  }
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Create Google Auth Provider instance
  
    try {
      const result = await signInWithPopup(auth, provider);
      alert(result.user.displayName)
      router.push('/')
      // Extract user details
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken; // Google Access Token
      // const user = result.user; // User object containing email, displayName, etc.
  
      // console.log("Access Token:", token);
      // console.log("User Info:", {
      //   uid: user.uid,
      //   name: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL,
      // });
  
      // You can now use the token to call Google APIs or display user info
      // alert(`Welcome, ${user.displayName}!`);
      // router.push('/')
    } catch (error) {
      // Error handling
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData?.email; // Email of the user if available
      // const credential = GoogleAuthProvider.credentialFromError(error);
  
      // console.error("Error Code:", errorCode);
      // console.error("Error Message:", errorMessage);
      // console.error("User Email (if available):", email);
  
      alert("Authentication failed. Please try again.");
    }
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
        <div className="flex flex-col  bg-gray-100">
      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4 shadow hover:bg-red-600"
      >
        Sign in with Google
      </button>
      <button
        onClick={handleGithubSignIn}
        className="bg-gray-800 text-white px-4 py-2 rounded mb-4 shadow hover:bg-gray-900"
      >
        Sign in with GitHub
      </button>
      <button
        onClick={handleFacebookSignIn}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Sign in with Facebook
      </button>
    </div>
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
